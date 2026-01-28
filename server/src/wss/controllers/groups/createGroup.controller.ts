import z from "zod";
import UserConnections from "../../store/user.js";
import { Prisma } from "../../../utility/prismaClient.js";
import { UserGroup } from "../../store/userGroup.js";
import Groups from "../../store/group.js";
import { sendMessageWithGroupId } from "../../services/sendMessage.js";
// import type { WebSocket } from "ws";
import { removeFromEverywhere } from "../../services/removeFromEverywhere.js";
import type WebSocket from "ws";
import WS from "ws";

const createGroupSchema = z.object({
  Name: z.string().min(1),
  members: z.array(z.number()).min(1),
  userId: z.number().min(1),
});
export async function createGroup(payload: object, ws: WebSocket) {
  console.log("here---->");
  const ParsedPayload = createGroupSchema.safeParse(payload);
  if (!ParsedPayload.success) {
    return;
  }
  const { Name, members, userId } = ParsedPayload.data;
  try {
    const userWs = UserConnections.get(userId);
    if (typeof userWs !== "undefined" && userWs !== ws) {
      throw new Error("you are not authorized for this userId ");
    }
    await Prisma.$transaction(
      async (tx) => {
        const group = await tx.group.create({
          data: { Name, type: "GROUP" },
        });
        const mem = members.map((x) => {
          return { userId: x, groupId: group.id };
        });
        mem.push({ userId, groupId: group.id });
        await tx.members.createMany({ data: mem });
        //now we can push this group in ws of every user online
        mem.forEach((m) => {
          UserGroup.set(m.userId, m.groupId);
          Groups.set(m.groupId, m.userId);
        });
        const mssg = { method: "CREATE_GROUP", payload: { group } };
        const mssgString = JSON.stringify(mssg);
        await sendMessageWithGroupId(group.id, mssgString);
        return;
      },
      { maxWait: 5000, timeout: 5000 }
    );
  } catch (e) {
    if (ws.readyState === WS.OPEN) {
      try {
        const mssg = {
          method: "ERROR",
          payload: { message: "create group not available" },
        };
        const mssgString = JSON.stringify(mssg);
        ws.send(mssgString);
      } catch (e) {
        removeFromEverywhere(userId);
      }
    } else {
      removeFromEverywhere(userId);
    }
    console.log(e);
  }
}
