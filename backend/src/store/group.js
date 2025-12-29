let mp = new Map();
const groupFunctions = {
    get: (groupId) => mp.get(groupId),
    set: (groupId, userId) => {
        if (typeof mp.get(groupId) != 'undefined') {
            mp.get(userId);
        }
        else {
            mp.set(groupId, [userId]);
        }
    },
    delete: (groupId, userId) => {
        try {
            mp.delete(groupId);
        }
        catch (e) { }
    },
};
const Groups = Object.freeze(groupFunctions);
export default Groups;
//# sourceMappingURL=group.js.map