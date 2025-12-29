import jwt from "jsonwebtoken";

export function onConnect(s: any, req: any) {
  try {
    const connectionUrl = req.url;
    const urlParams = new URLSearchParams(connectionUrl?.split("?")[1]);
    const token = urlParams.get("token");
    jwt.verify(token || " ", process.env.JWT_SECRET_KEY || " ");
  } catch (e) {
    s.close(1008, "need authorization");
    throw new Error("connection closed");
  }
}
