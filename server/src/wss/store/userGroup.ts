let mp = new Map<number, Set<number> | undefined>();
const UserGroupfunc = {
  get: (userId: number): Set<number> | undefined => mp.get(userId),
  set: (userId: number, groupId: number): void => {
    if (typeof mp.get(userId) != "undefined") {
      mp.get(userId)?.add(groupId);
    } else {
      mp.set(userId, new Set<number>([groupId]));
    }
  },
  delete: (userID: number, groupId: number): void => {
    try {
      mp.get(userID)?.delete(groupId);
      if (!mp.get(userID)?.size) {
        mp.delete(userID);
      }
    } catch (e) {}
  },
  deleteUser: (userID: number): void => {
    try {
      mp.delete(userID);
    } catch (e) {}
  },
};

const UserGroup = Object.freeze(UserGroupfunc);
export { UserGroup };
