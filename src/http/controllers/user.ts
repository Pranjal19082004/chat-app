import type { authRequest } from "../types/types.ts";
import { Prisma } from "../utility/prismaClient.js";
import { z } from "zod";
import type { Response } from "express";
async function userInfo(req: authRequest, res: Response) {
  try {
    const userId = z.number().parse(req.user);
    const foundUser = await Prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });
    return res.status(200).json({ message: "user found", data: { foundUser } });
  } catch (e) {
    return res.status(400).json({ message: "cant find the user" });
  }
}
