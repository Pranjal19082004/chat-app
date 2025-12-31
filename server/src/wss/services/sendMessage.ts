import Groups from "../store/group.js";
import UserConnections from "../store/user.js";
import { removeFromEverywhere } from "./removeFromEverywhere.js";

export async function sendMessageWithGroupId(
  GroupId: number,
  mssg: string,
): Promise<void> {
  const setOfUserIds = Groups.get(GroupId);
 
  if (typeof setOfUserIds == "undefined") {
    return;
  }
  //loop
  setOfUserIds.forEach((id) => {
    const s = UserConnections.get(id);
    if (typeof s == "undefined" || s.readyState !== WebSocket.OPEN) {
      removeFromEverywhere(id);
      return;
    }
    s.send(mssg, (e) => {
      if (e) {
        console.log(e.cause);
        removeFromEverywhere(id);
      }
    });
  });
}


//todo : send message to single user using user id 