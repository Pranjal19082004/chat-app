import { SEND_MESSAGE_TO_WS } from "../store/actions";
import { store } from "../store/store";

export function sendMessageService(
  senderId: number,
  groupId: number,
  content: string
) {
  const message = {
    method: "CHAT",
    payload: { senderId, groupId, content, chatId: 0 },
  };
  const messageString = JSON.stringify(message);
  store.dispatch(SEND_MESSAGE_TO_WS({ message: messageString }));
  console.log(SEND_MESSAGE_TO_WS({ message: messageString }));
}
