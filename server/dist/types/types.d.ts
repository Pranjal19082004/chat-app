import type { Request } from "express";
export interface authRequest extends Request {
    user: {
        username: string;
        userId: number;
    };
}
export type WebSocketChatRequestPayload = Record<string, string>;
//# sourceMappingURL=types.d.ts.map