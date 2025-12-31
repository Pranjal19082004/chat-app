// return a array of all the registered contact of a user

import type { Request, Response } from "express";
import { object, z, ZodError } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import type { authRequest } from "../../types/types.js";
import { isReturnStatement } from "typescript";
const listUserContactReqSchema = z.object(
  {
    user: z.object({
      userId: z.number(),
    }),
  },
  "not a error"
);
// contacts will only be used to start conversation or get members to create groups
export async function listUserContact(req: authRequest, res: Response) {
  try {
    const {
      user: { userId: id },
    } = listUserContactReqSchema.parse(req);
    // validation using zod schema
    // find the user in user table the user relation to get all the contact of the user to then user those contacts to find all the user name of those contacts
    const findUser = await Prisma.user.findUnique({
      where: { id },
      include: {
        contactsOfUser: {
          select: {
            contact: { select: { username: true, id: true } },
          },
        },
      },
    });

    const contacts = findUser?.contactsOfUser?.map((x) => x.contact);
    if (typeof contacts != "undefined") {
      return res.json({ contacts });
    }
    return res.status(404).json({ error: "no contact found" });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ error: e.message });
    } else {
      return res.status(500).json({ error: "internal server error " });
    }
  }
}
const addUserContactSchema = z.object({
  user: z.object({ userId: z.number() }),
  body: z.object({
    contactId: z.string().pipe(z.coerce.number()),
  }),
});
export async function addUserContact(req: authRequest, res: Response) {
  try {
    console.log(req);
    const {
      user: { userId },
      body: { contactId },
    } = addUserContactSchema.parse(req);
    if (userId === contactId) {
      return res
        .status(400)
        .json({ message: "cant make contact with yourself" });
    }
    const addedContactRes = await Prisma.contact.create({
      data: { userId, contactId },
      select: { id: true },
    });
    return res
      .status(200)
      .json({ message: "added contact", id: addedContactRes.id });
  } catch (e) {
    //@ts-ignore
    console.log(e?.issues);
    if (e instanceof ZodError) {
      return res.status(400).json({ error: "bad Request" });
    } else {
      return res.status(400).json({ error: "cant create" });
    }
  }
}

//not tested 
//delete contact

export async function deletContact(req: authRequest, res: Response) {
  try {
    const contactId = z.number().parse(req.query.contactId);
    const userId = z.number().parse(req.user.userId);
    await Prisma.contact.delete({
      where: { userId_contactId: { contactId, userId } },
    });
    return res.status(200).json({ message: "contact deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: "error" });
  }
}

