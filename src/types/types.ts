import type { Request } from "express";
export type authRequest = Request & {
  user: { username: string; userId: string };
};
export type WebSocketChatRequestPayload = Record<string, string>;
