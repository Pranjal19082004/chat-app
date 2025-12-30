import type { Request } from "express";
export interface authRequest extends Request {
  user: { username: string; userId: string };
}
export type WebSocketChatRequestPayload = Record<string, string>;
