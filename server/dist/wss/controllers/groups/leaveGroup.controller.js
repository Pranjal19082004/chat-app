import z from "zod";
import { Prisma } from "../../../utility/prismaClient.js";
import Groups from "../../store/group.js";
import { UserGroup } from "../../store/userGroup.js";
import { sendMessageWithGroupId } from "../../services/sendMessage.js";
import UserConnections from "../../store/user.js";
import { removeFromEverywhere } from "../../services/removeFromEverywhere.js";
import WebSocket from "ws";
const leaveGroupSchema = z.object({
    senderId: z.number(),
    groupId: z.number(),
});
export async function leaveGroup(ws, payload) {
    const parsedPayload = leaveGroupSchema.safeParse(payload);
    if (!parsedPayload.success) {
        return;
    }
    const { senderId: userId, groupId } = parsedPayload.data;
    if (UserConnections.get(userId) !== ws) {
        return;
    }
    try {
        const leaveGroupRes = await Prisma.members.update({
            where: { userId_groupId: { userId, groupId }, leftAt: null },
            data: { leftAt: new Date() },
        });
        Groups.delete(groupId, userId);
        UserGroup.delete(userId, groupId);
        const mssg = {
            method: "LEFT_GROUP",
            payload: {
                groupId: leaveGroupRes.groupId,
                userId: leaveGroupRes.userId,
                leftAt: leaveGroupRes.leftAt,
            },
        };
        const mssgString = JSON.stringify(mssg);
        sendMessageWithGroupId(groupId, mssgString);
    }
    catch (e) {
        const mssg = { method: "ERROR", payload: { cause: "LEAVE_NOT_AVAILABLE" } };
        const mssgString = JSON.stringify(mssg);
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(mssgString, (err) => {
                if (err)
                    removeFromEverywhere(userId);
            });
        }
        else {
            removeFromEverywhere(userId);
        }
    }
}
//# sourceMappingURL=leaveGroup.controller.js.map