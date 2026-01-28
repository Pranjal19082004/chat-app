import { number } from "zod";
let mp = new Map();
const groupFunctions = {
    get: (groupId) => mp.get(groupId),
    set: (groupId, userId) => {
        if (typeof mp.get(groupId) != "undefined") {
            mp.get(groupId)?.add(userId);
        }
        else {
            mp.set(groupId, new Set([userId]));
        }
    },
    delete: (groupId, userId) => {
        try {
            mp.get(groupId)?.delete(userId);
            if (!mp.get(groupId)?.size) {
                mp.delete(groupId);
            }
        }
        catch (e) { }
    },
    deleteGroup: (groupId) => {
        try {
            mp.delete(groupId);
        }
        catch (e) { }
    },
};
const Groups = Object.freeze(groupFunctions);
export default Groups;
//# sourceMappingURL=group.js.map