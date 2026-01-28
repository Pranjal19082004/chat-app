import z, { ZodError } from "zod";
import { Prisma } from "../../../utility/prismaClient.js";
import { sendMessageWithGroupId } from "../../services/sendMessage.js";
import { UserGroup } from "../../store/userGroup.js";
import { closeSocket, removeUserConnection, } from "../../services/removeUserConnection.js";
import UserConnections from "../../store/user.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
const groupMessageSchema = z.object({
    senderId: z.number(),
    groupId: z.number(),
    content: z.string(),
});
export async function groupMessage(payload) {
    try {
        const { senderId, groupId, content } = groupMessageSchema.parse(payload);
        if (!UserGroup.get(senderId)?.has(groupId)) {
            closeSocket(UserConnections.get(senderId), 1008, "you sent to wrong group");
            return;
        }
        const mssg = await Prisma.message.create({
            data: {
                content,
                groupId,
                senderId,
            },
        });
        // TODO:we decide what to send to client side later
        sendMessageWithGroupId(groupId, JSON.stringify(mssg));
    }
    catch (e) {
        if (e instanceof ZodError) {
            console.log("bad request");
        }
        else if (e instanceof PrismaClientKnownRequestError) {
            console.log("prsima error");
        }
    }
}
//# sourceMappingURL=groupMessage.controller.js.map