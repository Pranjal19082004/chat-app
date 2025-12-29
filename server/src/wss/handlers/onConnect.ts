import jwt from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import Groups from "../store/group.js";
import UserConnections from "../store/user.js";
import type WebSocket from "ws";
export async function onConnect(s: WebSocket, req: any) {
  try {
    const connectionUrl = req.url;
    const urlParams = new URLSearchParams(connectionUrl?.split("?")[1]);
    const token = urlParams.get("token");
    const { userId, username } = z
      .object({ userId: z.number(), username: z.number() })
      .parse(jwt.verify(token || " ", process.env.JWT_SECRET_KEY || " "));

    const allGroups = await Prisma.members.findMany({
      where: { userId },
      select: { groupId: true },
    });
    UserConnections.set(userId, s);
    allGroups.forEach((id) => {
      Groups.set(id.groupId, userId);
    });
  } catch (e) {
    s.close(1008, "need authorization");
    throw new Error("connection closed");
  }
}
