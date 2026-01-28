import z, {} from "zod";
import { Prisma } from "../../../utility/prismaClient.js";
import { sendMessageWithGroupId } from "../../services/sendMessage.js";
import UserConnections from "../../store/user.js";
import { removeFromEverywhere } from "../../services/removeFromEverywhere.js";
import WebSocket from "ws";
const deleteMessageSchema = z.object({
    mssgId: z.number(),
    senderId: z.number(),
    groupId: z.number(),
});
export async function DeleteMessage(payload) {
    const parsedPayload = deleteMessageSchema.safeParse(payload);
    if (!parsedPayload.success) {
        return;
    }
    const { mssgId, senderId, groupId } = parsedPayload.data;
    try {
        const deletemssgRes = await Prisma.message.update({
            where: { id: mssgId, groupId, senderId, deleted: false },
            data: { deleted: true },
        });
        const mssg = { method: "DELETE_MESSAGE", payload: { ...deletemssgRes } };
        sendMessageWithGroupId(groupId, JSON.stringify(mssg));
    }
    catch (e) {
        const reply = { method: "ERROR", payload: { cause: "cant find message" } };
        const replyString = JSON.stringify(reply);
        //todo : write a ws sender service  like sendMessageWithGroup later ( zinda bache toh phir likhega )
        const s = UserConnections.get(senderId);
        if (s && s.readyState === WebSocket.OPEN) {
            s?.send(replyString, (err) => {
                if (err) {
                    removeFromEverywhere(senderId);
                }
            });
        }
        else {
            removeFromEverywhere(senderId);
        }
    }
}
//# sourceMappingURL=deleteMessage.controller.js.map