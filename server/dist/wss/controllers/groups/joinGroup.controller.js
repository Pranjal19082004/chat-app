import WebSocket from "ws";
import z from "zod";
import { Prisma } from "../../../utility/prismaClient.js";
import { sendMessageWithGroupId } from "../../services/sendMessage.js";
import { removeFromEverywhere } from "../../services/removeFromEverywhere.js";
import { UserGroup } from "../../store/userGroup.js";
import Groups from "../../store/group.js";
const joinGroupPayloadSchema = z.object({
    groupId: z.number(),
    senderId: z.number(),
});
export async function joinGroup(ws, payload) {
    const parsedPayload = joinGroupPayloadSchema.safeParse(payload);
    if (!parsedPayload.success) {
        return;
    }
    const { groupId, senderId } = parsedPayload.data;
    try {
        const joinGroupRes = await Prisma.members.create({
            data: { groupId, userId: senderId },
        });
        const mssg = {
            method: "JOIN_GROUP",
            payload: {
                ...joinGroupRes,
            },
        };
        UserGroup.set(senderId, groupId);
        Groups.set(groupId, senderId);
        const mssgString = JSON.stringify(mssg);
        sendMessageWithGroupId(groupId, mssgString);
    }
    catch (e) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const mssg = { method: "ERROR", payload: { cause: "JOIN_NOT_ALLOWED" } };
            const mssgString = JSON.stringify(mssg);
            ws.send(mssgString, (err) => {
                if (err)
                    removeFromEverywhere(senderId);
            });
        }
        else {
            removeFromEverywhere(senderId);
        }
    }
}
//# sourceMappingURL=joinGroup.controller.js.map