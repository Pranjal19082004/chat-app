import type { SagaIterator } from "redux-saga";
import { put, select, take, takeEvery } from "redux-saga/effects";
import type { RootState } from "../../store";
import { addChat } from "../../slices/chat";
import db from "../../../DB/db";
function* workerWebSocketMessageReciever(action): SagaIterator {
  const { payload } = action;
  const groupId = yield select((state: RootState) => state.chat.groupId);
  if (payload.groupId == groupId) {
    yield put(addChat(payload));
  }
  db.messages.add(payload);
}
export function* watchWebSocketMessage(): SagaIterator {
  yield take("SOCKET_CONNECTED");
  yield takeEvery("CHAT", workerWebSocketMessageReciever);
}
