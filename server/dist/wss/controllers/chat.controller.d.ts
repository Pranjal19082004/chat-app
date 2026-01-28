import type { WebSocketChatRequestPayload } from "../../types/types.js";
import type { WebSocket as ws } from "ws";
export declare function singleChatController(payload: WebSocketChatRequestPayload, ws: ws): Promise<void>;
export declare function groupChatController(payload: WebSocketChatRequestPayload): Promise<void>;
//# sourceMappingURL=chat.controller.d.ts.map