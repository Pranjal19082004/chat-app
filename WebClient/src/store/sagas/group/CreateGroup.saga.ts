import { put, take, takeEvery } from "redux-saga/effects";
import { SEND_MESSAGE_TO_WS } from "../../actions";
function* workerCreateGroup({
  payload: { userId, members, Name },
}: {
  payload: { userId: number; members: number[]; Name: string };
}) {
  if (!(userId && members.length && Name)) {
    console.log("errr");
    return;
  }
  const mssg = { method: "CREATE_GROUP", payload: { userId, members, Name } };
  const mssgString = JSON.stringify(mssg);
  console.log(mssgString);
    yield put(SEND_MESSAGE_TO_WS({ message: mssgString }));
}
export function* watchCreateGroup() {
  yield take("SOCKET_CONNECTED");
  yield takeEvery("CREATE_GROUP", workerCreateGroup);
}
