import { Prisma } from "../../utility/prismaClient.js";
import { z, ZodError } from "zod";
export async function userInfo(req, res) {
    try {
        // const userId = z.number().parse(req.user);
        const userId = z.number().parse(req.params.id);
        const foundUser = await Prisma.user.findUnique({
            where: { id: userId },
            omit: { password: true },
        });
        return res.status(200).json({ message: "user found", foundUser });
    }
    catch (e) {
        if (e instanceof ZodError) {
            console.log(e);
            return res.status(400).json({ message: "bad request" });
        }
        return res.status(400).json({ message: "cant find the user" });
    }
}
//# sourceMappingURL=user.js.map