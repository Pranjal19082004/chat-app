import type { Request } from 'express';
import { record } from 'zod';
export type authRequest = Request & {
  user: { username: string; userId: string };
};
export type WebSocketChatRequestPayload = Record<string, string>;
