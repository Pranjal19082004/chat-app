import type { SagaIterator } from "redux-saga";
import { take, call, put, fork, takeEvery, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api";
import db from "../../../DB/db";
import { replaceGroupList } from "../../slices/groups";
function* workerGetGroupData(): SagaIterator {
  try {
    const { groups } = yield call(api.getUserGroups);
    db.groups.bulkPut(groups);
    yield put(replaceGroupList(groups));
  } catch (e) {
    console.log("err");
  }
}
const wrapperForGroupWhereAboveEqual = () =>
  db.groups.where("groupId").aboveOrEqual(0).toArray();
function* workerGetDBGroupData(): SagaIterator {
  try {
    const groups = yield call(wrapperForGroupWhereAboveEqual);
    console.log(groups);
    yield put(replaceGroupList(groups));
  } catch (e) {
    console.log("err");
  }
}
export function* WatcherGetGroupData(): SagaIterator {
  if (!localStorage.getItem("token")) {
    yield take("LOGIN_SUCCESSFUL");
  }
  yield fork(workerGetDBGroupData);
  yield call(workerGetGroupData);
}
