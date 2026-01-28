import { all, fork } from "redux-saga/effects";
import watcherWebSocket from "./WebSocket";
import { WatcherGetGroupData } from "./group/groups.saga";
import { watcherChatLoader, watchReconnectLoadChat } from "./message/loadChat";
import { watchWebSocketMessage } from "./message/websocketMessageReciever";
import { watchCreateGroup } from "./group/CreateGroup.saga";
export default function* rootSaga() {
  console.log("in the root saga");
  //   yield all([fork(watcherWebSocket), fork(WatcherGetGroupData)]);
  yield fork(watcherWebSocket);
  yield fork(WatcherGetGroupData);
  yield fork(watcherChatLoader);
  yield fork(watchReconnectLoadChat);
  yield fork(watchWebSocketMessage);
  yield fork(watchCreateGroup);
  console.log("out of the root saga");
}
