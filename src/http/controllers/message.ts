import { number, optional, z, ZodE164, ZodError } from "zod";
import { Prisma } from "../utility/prismaClient.js";
import { FileWatcherEventKind } from "typescript";
export async function getMessages(req, res) {
  try {
    const groupId = z.number().parse(req.params.groupId);
    const { pageSize, lastMessageId } = z
      .object({ pageSize: z.number(), lastMessageId: z.number().optional() })
      .parse(req.query);
    let messages = [];
    if (lastMessageId) {
      messages = await Prisma.message.findMany({
        include: {
          Sender: { select: { username: true } },
        },
        where: { groupId },
        orderBy: { sendTimeStamp: "desc", id: "desc" },
        skip: 1,
        take: pageSize,
        cursor: { id: lastMessageId },
      });
    } else {
      messages = await Prisma.message.findMany({
        include: {
          Sender: { select: { username: true } },
        },
        where: { groupId },
        orderBy: { sendTimeStamp: "desc", id: "desc" },
        take: pageSize,
      });
    }
    return res.status(200).json({ messages });
  } catch (e) {
    return res.status(404).json({ error: "cant find any messages" });
  }
}
export async function DeleteMessage(req, res) {
  const userId = z.number().parse(req.user.userId);
  const { messageId } = z.object({ messageId: z.number() }).parse(req.body);
  const deleteMessageRes = await Prisma.message.delete({
    where: { id: messageId },
  });
}
export async function updateMessage(req, res) {
  try {
    const mssgId = z.number().parse(req.body.mssgId);
    const cont = z.string().parse(req.body.cont);
    const UpdateMssg = await Prisma.message.update({
      where: {
        id: mssgId,
      },
      data: {
        content: cont,
      },
      select: {
        content: true,
      },
    });
    return res
      .status(404)
      .json({ message: "message updated", content: UpdateMssg.content });
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ error: "validation error" });
    }
    return res.status(404).json({ message: "message cant be updated" });
  }
}
//# sourceMappingURL=message.controller.js.map
