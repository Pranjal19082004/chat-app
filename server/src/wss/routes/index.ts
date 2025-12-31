import type WebSocket from "ws";
import type { WsMssgMethod } from "../../types/wsTypes.js";
import { singleChatController } from "../controllers/chat.controller.js";
const routes: Record<
  WsMssgMethod,
  (payload: object, ws: WebSocket) => Promise<void>
> = {
  CHAT: singleChatController,
  MESSAGE: async () => {},
  GROUP_MESSAGE: async () => {},
  UPDATE_MESSAGE: async () => {},
  DELETE_MESSAGE: async () => {},
  TYPING_MESSAGE: async () => {},
  ACK_MESSAGE: async () => {},
  JOIN_GROUP: async () => {},
  LEAVE_GROUP: async () => {},
};
const router = Object.freeze(routes);
export default router;
