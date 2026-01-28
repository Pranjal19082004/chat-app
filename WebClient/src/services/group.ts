import { SEND_MESSAGE_TO_WS } from "../store/actions";
import { store } from "../store/store";

export function createGroupService(
  userId: number,
  Name: string,
  members: number[]
) {
  if (!(userId && members.length && Name)) {
    console.log("errr");
    return;
  }
  const mssg = { method: "CREATE_GROUP", payload: { userId, members, Name } };
  const mssgString = JSON.stringify(mssg);
  console.log(mssgString);
  store.dispatch(SEND_MESSAGE_TO_WS({ message: mssgString }));
}
