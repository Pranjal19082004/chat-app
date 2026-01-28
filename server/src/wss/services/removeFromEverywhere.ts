import { groupChatController } from "../controllers/messages/chat.controller.js";
import Groups from "../store/group.js";
import UserConnections from "../store/user.js";
import { UserGroup } from "../store/userGroup.js";
import { removeUserConnection } from "./removeUserConnection.js";

export async function removeFromEverywhere(userId: number) {
  const allGrps = UserGroup.get(userId);
  if (typeof allGrps == "undefined") {
    return;
  }
  allGrps.forEach((grpId) => Groups.delete(grpId, userId));
  UserGroup.deleteUser(userId);
  removeUserConnection(userId);
}
