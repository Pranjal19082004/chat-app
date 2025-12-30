import type WebSocket from "ws";
import type { WsMssgMethod } from "../../types/wsTypes.js";
import { singleChatController } from "../controllers/chat.controller.js";
const routes: Record<
  WsMssgMethod,
  (payload: Record<string, string>, ws: WebSocket) => Promise<void>
> = {
  CHAT: singleChatController,
  GROUP_CHAT: async () => {},
  MESSAGE_ACK: async () => {},
  READ: async () => {},
};
const router = Object.freeze(routes);
export default router;
