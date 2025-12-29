import { Prisma } from '../utility/prismaClient.js';
import { z } from 'zod';
async function userInfo(req, res) {
    try {
        const userId = z.number().parse(req.user);
        const foundUser = await Prisma.user.findUnique({
            where: { id: userId },
            omit: { password: true },
        });
        return res.status(200).json({ message: 'user found', data: { foundUser } });
    }
    catch (e) {
        return res.status(400).json({ message: 'cant find the user' });
    }
}
//# sourceMappingURL=user.controller.js.map