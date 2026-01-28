import type WebSocket from "ws";
import type { WsMssgMethod } from "../../types/wsTypes.js";
import { singleChatController } from "../controllers/messages/chat.controller.js";
import { createGroup as createGroupController } from "../controllers/groups/createGroup.controller.js";
const routes: Record<
  WsMssgMethod,
  (payload: object, ws: WebSocket) => Promise<void>
> = {
  //@ts-ignore
  CHAT: singleChatController,
  MESSAGE: async () => {},
  GROUP_MESSAGE: async () => {},
  UPDATE_MESSAGE: async () => {},
  DELETE_MESSAGE: async () => {},
  TYPING_MESSAGE: async () => {},
  ACK_MESSAGE: async () => {},
  JOIN_GROUP: async () => {},
  LEAVE_GROUP: async () => {},
  CREATE_GROUP: createGroupController,
};
const router = Object.freeze(routes);
export default router;
