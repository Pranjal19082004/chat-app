// return a array of all the registered contact of a user

import type { Request, Response } from "express";
import { object, z } from "zod";
import { Prisma } from "../../utility/prismaClient.js";
import type { authRequest } from "../../types/types.js";
const listUserContactReqSchema = z.object(
  {
    user: z.object({ userId: z.number("id is not present") }),
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
// add contact
//delete contact
//update contact 
// block a contact 
