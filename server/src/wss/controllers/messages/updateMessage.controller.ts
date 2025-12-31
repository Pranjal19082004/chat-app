import z from "zod";
import { Prisma } from "../../../utility/prismaClient.js";
import WebSocket from "ws";
import { sendMessageWithGroupId } from "../../services/sendMessage.js";
import { removeFromEverywhere } from "../../services/removeFromEverywhere.js";
const updateMessagePayloadSchema = z.object({
  groupId: z.number(),
  senderId: z.number(),
  mssgId: z.number(),
  content: z.string().min(1).max(2000),
});
export async function updateMessage(ws: WebSocket, payload: object) {
  const parsedPayload = updateMessagePayloadSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return;
  }
  const { groupId, senderId, mssgId, content } = parsedPayload.data;
  try {
    const updateMssgRes = await Prisma.message.update({
      where: {
        id: mssgId,
        groupId,
        senderId,
        deleted: false,
      },
      data: {
        content,
      },
    });
    const mssg = {
      method: "UPDATE_MESSAGE",
      payload: {
        ...updateMssgRes,
      },
    };
    const mssgString = JSON.stringify(mssg);
    sendMessageWithGroupId(groupId, mssgString);
  } catch (e) {
    const res = { method: "ERROR", payload: { cause: "UPDATE_NOT_ALLOWED" } };
    const resString = JSON.stringify(res);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(resString, (e) => {
        if (e) removeFromEverywhere(senderId);
      });
    } else {
      removeFromEverywhere(senderId);
    }
  }
}
