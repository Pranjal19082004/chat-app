import { response, type Request, type Response } from "express";
import { Prisma } from "../../utility/prismaClient.js";
import { Type } from "../../generated/prisma/index.js";
import z, { ZodError } from "zod";
import type { authRequest } from "../../types/types.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

//create a group api
const createGroupRequestSchema = z.object({
  type: z.enum(["SINGLE", "GROUP"]),
  Name: z.string(),
  data: z.array(z.string().pipe(z.coerce.number())), // data will conatin userid  array who will be joining the group
});
export async function createGroup(req: authRequest, res: Response) {
  // we will need id of the user to make him the part of the group
  try {
    const id = z.number().parse(req.user.userId);
    console.log(req.body);
    const {
      type,
      Name: groupName,
      data,
    } = createGroupRequestSchema.parse(req.body);

    data.push(id);
    console.log(data);
    // create a group entry
    const dataEntries = data.map((x) => {
      return { userId: x };
    });
    const groupCreatedRes = Prisma.group.create({
      data: {
        type: Type[type],
        Name: groupName,
        members: {
          create: dataEntries,
        },
      },
    });
    return res.status(200).json({
      message: "group created ",
      "group id": (await groupCreatedRes).id,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ error: "bad request" });
    } else {
      return res.status(500).json({ error: "internal Server Error" });
    }
  }
}

//join a group api
// to be removed since it is will done using webSocket
const joinGroupRequestSchema = z.object({
  groupId: z.string().pipe(z.coerce.number()),
});
export async function joinGroup(req: authRequest, res: Response) {
  // need a group id and user id to make entry to the member
  try {
    const userId = z.number().parse(req.user.userId);

    const { groupId } = joinGroupRequestSchema.parse(req.body);
    const joinGroupRes = await Prisma.members.create({
      data: { userId, groupId },
    });
    return res.status(400).json({ message: "group joined successfully" });
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ error: "bad request" });
    } else if (e instanceof PrismaClientKnownRequestError) {
      return res.status(409).json({ error: "you already part of the group" });
    } else {
      return res.status(500).json({ error: "internal server error" });
    }
  }
}

// leave a group api
const leaveGroupRequestSchema = z.object({ groupId: z.number() });
export async function leaveGroup(req: authRequest, res: Response) {
  try {
    const userId = z.number().parse(req.user.userId);
    const { groupId } = leaveGroupRequestSchema.parse(req.body);

    const leaveGroupRes = await Prisma.members.update({
      where: { userId_groupId: { userId, groupId } },
      data: { leftAt: new Date() },
    });
    return res.status(200).json({ message: "successfully left the group" });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ error: e.message });
    } else if (e instanceof ZodError) {
      return res.status(400).json({ message: "bad request" });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  }
}

// to get all the groups, a user is part of :
// first take all entries of members (participant table )--> group id
