import type { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import { Prisma } from "../../utility/prismaClient.js";
import router from "../routes/auth.routes.js";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
const signupZod = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.email().min(1),
});
export async function signUp(req: Request, res: Response): Promise<Response> {
  try {
    const { username, email, password } = signupZod.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await Prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
      },
    });
    console.log(createdUser);
    return res.status(200).json({ message: "user created successfully" });
  } catch (e) {
    console.log(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return res.json(400).json({ message: "user already exist" });
    }
    return res.status(500).json({ message: "internal server error" });
  }
}
const signinSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});
export async function signin(req: Request, res: Response) {
  try {
    console.log(-1);
    const { email, password } = signinSchema.parse(req.body);
    console.log(0);
    const findUser = await Prisma.user.findUnique({
      where: { email },
      select: {
        username: true,
        email: true,
        password: true,
        status: true,
        id: true,
      },
    });
    if (!findUser) {
      return res.status(404).json({ message: "no user found" });
    }
    const b = await bcrypt.compare(password, findUser.password);
    if (!b) {
      return res.status(401).json({ error: "password is incorrect" });
    }
    // jwt genrate
    const key = process.env.JWT_SECRET_KEY;
    if (typeof key != "undefined") {
      const token = jwt.sign(
        {
          username: findUser.username,
          email: findUser.email,
          status: findUser.status,
          userId: findUser.id,
        },
        key
      );
      const { password, ...userInfo } = findUser;
      return res
        .status(200)
        .json({ message: "signed in", token, ...userInfo,userId:userInfo.id });
    } else {
      console.log("please provide jwt private key");
      throw new Error("jwt private key not defined");
    }
  } catch (e) {
    return res.status(500).json({ message: "internal server error" });
  }
}
//todo : to make it later
export async function lastOnline(req: Request, res: Response) {}
