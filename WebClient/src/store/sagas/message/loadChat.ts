import type { SagaIterator } from "redux-saga";
import { call, put, take, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api";
import db from "../../../DB/db";
import { changeChat } from "../../slices/chat";
const callWrapper = (groupId: number) => {
  return db.messages.where("groupId").equals(groupId).sortBy("id");
};
function* workerChatLoading({ payload: { groupId, groupName } }): SagaIterator {
  try {
    if (typeof groupId == "number") {
      let messages = yield call(callWrapper, groupId);
      yield put({
        type: changeChat.type,
        payload: { groupId, groupName, type: "GROUP", messages },
      });
    } else {
      throw new Error("gorup id is not number");
    }
  } catch (e) {
    console.log("error");
    if (e instanceof Error) {
      console.log(e.message);
    }
    return;
  }
}
export function* watcherChatLoader(): SagaIterator {
  try {
    let token = localStorage.getItem("token");
    if (!token) {
      const action = yield take("LOGIN_SUCCESSFUL");
      token = action.type;
    }
    yield takeLatest("CHANGE_CHAT", workerChatLoading);
  } catch (e) {}
}
const callWrapperForDBMessageMaxId = () => {
  return db.messages.orderBy("id").last();
};
const callWrapperForDBMessageBulkPut = (messages) =>
  db.messages.bulkPut(messages);
function* workerReconnectLoadChat(): SagaIterator {
  try {
    const lastMssg = yield call(callWrapperForDBMessageMaxId);
    let maxId = 0;
    if (Array.isArray(lastMssg) && lastMssg.length > 0 && "id" in lastMssg[0]) {
      maxId = lastMssg[0].id;
    } else if (typeof lastMssg === "object") {
      maxId = lastMssg.id;
    }
    const { messages } = yield call(api.getAllMessagesAfter, maxId);
    if (Array.isArray(messages) && messages.length > 0) {
      yield call(callWrapperForDBMessageBulkPut, messages);
    }
  } catch (e) {
    console.log(e);
  }
}
export function* watchReconnectLoadChat(): SagaIterator {
  yield takeLatest("SOCKET_CONNECTED", workerReconnectLoadChat);
}
