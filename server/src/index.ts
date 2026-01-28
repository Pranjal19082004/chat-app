import express from "express";
import { createServer } from "http";
import { config } from "dotenv";
import cors from "cors";
config();
import "./utility/prismaClient.js";
import initWebSocketServer from "./wss/index.js";
const app = express();
//parsing middlewares and cors
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
//routes
import authRouter from "./http/routes/auth.routes.js";
app.use("/api/auth", authRouter);

import { authMiddleware } from "./http/middlewares/authMiddleware.js";
app.use(authMiddleware);
import groupRouter from "./http/routes/group.routes.js";
app.use("/api/group", groupRouter);
import contactRouter from "./http/routes/contact.routes.js";
app.use("/api/contact", contactRouter);
import messageRouter from "./http/routes/message.route.js";
app.use("/api/message", messageRouter);
import userRouter from "./http/routes/user.routes.js";
app.use("/api/user", userRouter);
app.use((req ,res , next)=>{return res.status(404).json({message:"cant find the route you asked"})})
const server = createServer(app);
const wss = initWebSocketServer(server);

server.listen(3000, () => {
  console.log("server is now listening on PORT: 3000\n");
});

