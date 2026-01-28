let mp = new Map();
const UserGroupfunc = {
    get: (userId) => mp.get(userId),
    set: (userId, groupId) => {
        if (typeof mp.get(userId) != "undefined") {
            mp.get(userId)?.add(groupId);
        }
        else {
            mp.set(userId, new Set([groupId]));
        }
    },
    delete: (userID, groupId) => {
        try {
            mp.get(userID)?.delete(groupId);
            if (!mp.get(userID)?.size) {
                mp.delete(userID);
            }
        }
        catch (e) { }
    },
    deleteUser: (userID) => {
        try {
            mp.delete(userID);
        }
        catch (e) { }
    },
};
const UserGroup = Object.freeze(UserGroupfunc);
export { UserGroup };
//# sourceMappingURL=userGroup.js.map