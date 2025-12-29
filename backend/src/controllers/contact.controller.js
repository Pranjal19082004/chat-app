// return a array of all the registered contact of a user
import { object, z } from 'zod';
import { Prisma } from '../utility/prismaClient.js';
const listUserContactReqSchema = z.object({
    user: z.object({ userId: z.number('id is not present') }),
}, 'not a error');
export async function listUserContact(req, res) {
    try {
        const { user: { userId: id }, } = listUserContactReqSchema.parse(req);
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
        if (typeof contacts != 'undefined') {
            return res.json({ contacts });
        }
        return res.status(404).json({ error: 'no contact found' });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({ error: e.message });
        }
        else {
            return res.status(500).json({ error: 'internal server error ' });
        }
    }
}
//# sourceMappingURL=contact.controller.js.map