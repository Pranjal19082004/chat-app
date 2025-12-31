import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import Groups from "../store/group.js";
import UserConnections from "../store/user.js";
import type WebSocket from "ws";
import { UserGroup } from "../store/userGroup.js";
import type { RawData } from "ws";
import { removeFromEverywhere } from "../services/removeFromEverywhere.js";
import router from "../routes/index.js";
import { wsMessageSchema } from "../../types/wsTypes.js";
export async function onConnect(s: WebSocket, req: any) {
  try {
    s.send("pong");
    const connectionUrl = req.url;
    const urlParams = new URLSearchParams(connectionUrl?.split("?")[1]);
    const token = urlParams.get("token");

    const { userId, username } = z
      .object({ userId: z.number(), username: z.string() })
      .parse(jwt.verify(token || " ", process.env.JWT_SECRET_KEY || " "));
    console.log(`${username} ${userId} token has been verified`);
    //authorized after this
    const allGroups = await Prisma.members.findMany({
      where: { userId },
      select: { groupId: true },
    });
    UserConnections.set(userId, s);
    allGroups.forEach((id) => {
      Groups.set(id.groupId, userId);
      UserGroup.set(userId, id.groupId);
    });
    //add event listeners
	s.on("message", (data: RawData) => {
    const { method, payload } = wsMessageSchema.parse(
      JSON.parse(data.toString())
    );
    router[method]?.(payload, s);
  });

    s.on("close", () => {
      removeFromEverywhere(userId);
    });

    s.on("error", () => {
      removeFromEverywhere(userId);
    });
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      s.close(1008, "need authorization");
    } else {
      s.close(1008, "internal server error ");
    }
  }
}
