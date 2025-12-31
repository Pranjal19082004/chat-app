import type { authRequest } from "../../types/types.js";
import { z, ZodError } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import type { Response } from "express";
export async function getMessages(req: authRequest, res: Response) {
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
// not really needed since that will be done on websockets
export async function DeleteMessage(req: authRequest, res: Response) {
  try {
    const userId = z.number().parse(req.user.userId);
    const { messageId } = z.object({ messageId: z.number() }).parse(req.params);
    const deleteMessageRes = await Prisma.message.delete({
      where: { senderId: userId, id: messageId },
    });
  } catch (e) {
    res.status(400).json({ error: "cant delete you message" });
  }
}
// will not be needed since that will be done on websockets 
export async function updateMessage(req: authRequest, res: Response) {
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
