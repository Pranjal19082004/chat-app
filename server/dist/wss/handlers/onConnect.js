import jwt from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import Groups from "../store/group.js";
import UserConnections from "../store/user.js";
import { UserGroup } from "../store/userGroup.js";
import { removeFromEverywhere } from "../services/removeFromEverywhere.js";
import router from "../routes/index.js";
import { wsMessageSchema } from "../../types/wsTypes.js";
export async function onConnect(s, req) {
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
        s.on("message", (data) => {
            console.log("h-->");
            const { method, payload } = wsMessageSchema.parse(JSON.parse(data.toString()));
            console.log(data.toString());
            router[method]?.(payload, s);
        });
        s.on("close", () => {
            removeFromEverywhere(userId);
        });
        s.on("error", () => {
            removeFromEverywhere(userId);
        });
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            s.close(1008, "need authorization");
        }
        else {
            s.close(1008, "internal server error ");
        }
    }
}
//# sourceMappingURL=onConnect.js.map