import type WebSocket from "ws";
import type { WsMssgMethod } from "../../types/wsTypes.js";
import { groupChatController ,singleChatController } from "../controllers/chat.controller.js";
const routes: Record<
  WsMssgMethod,
  (payload: Record<string, never>, ws: WebSocket) => Promise<void>
> = {
  CHAT: singleChatController,
  GROUP_CHAT: async () => {},
  MESSAGE_ACK: async () => {},
  READ: async () => {},
};
const router = Object.freeze(routes);
export default router;
