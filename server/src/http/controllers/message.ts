import type { authRequest } from "../../types/types.js";
import { number, treeifyError, z, ZodError } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import type { Response } from "express";
import type { RestTypeNode } from "typescript";
export async function getMessages(req: authRequest, res: Response) {
  try {
    const groupId = z
      .string()
      .pipe(z.coerce.number())
      .parse(req.params.groupId);
    const { pageSize = 20, lastMessageId = null } = z
      .object({
        pageSize: z.number().optional(),
        lastMessageId: z.number().optional(),
      })
      .parse(req.query);
    let messages = [];
    if (lastMessageId) {
      messages = await Prisma.message.findMany({
        include: {
          Sender: { select: { username: true } },
        },
        where: { groupId },
        orderBy: [{ sendTimeStamp: "desc" }, { id: "desc" }],
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
        orderBy: [{ sendTimeStamp: "desc" }, { id: "desc" }],
        take: pageSize,
      });
    }
    console.log("req was here");
    return res.status(200).json({ messages });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ error: "cant find any messages" });
  }
}
const getMessageAfterSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
  groupId: z.string().pipe(z.coerce.number()),
});
export async function getMessageAfter(req: authRequest, res: Response) {
  //   console.log("this function was hit");
  //   return res.status(200).json()
  try {
    const { userId: id } = req.user;
    const { id: messageId, groupId } = getMessageAfterSchema.parse(req.query);
    console.log(groupId);
    const mssgRes = await Prisma.members.findUnique({
      where: { userId_groupId: { groupId: groupId, userId: id } },
      select: {
        group: {
          select: {
            type: true,
            message: {
              where: {
                id: {
                  gt: messageId,
                },
              },
            },
          },
        },
      },
    });
    return res.json({
      messages: mssgRes?.group.message,
      type: mssgRes?.group.type,
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      error:
        "either login or you are not a member of the group you want messages of ",
    });
  }
}
const getAllMessageAfterSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
});
export async function getAllMessageAfter(req: authRequest, res: Response) {
  const { id: mssgId } = getAllMessageAfterSchema.parse(req.query);
  const { userId } = req.user;
  const dataRes = await Prisma.members.findMany({
    where: { userId },
    select: {
      group: {
        select: {
          message: {
            where: {
              id: {
                gt: mssgId,
              },
            },
          },
		  
        },
      },
    },
  });
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
