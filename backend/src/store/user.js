let mp = new Map();
const UsersFunctions = {
    get: (userId) => mp.get(userId),
    set: (userId, s) => {
        mp.set(userId, s);
    },
    delete: (userID) => {
        mp.delete(userID);
    },
};
const UserConnections = Object.freeze(UsersFunctions);
export default UserConnections;
//# sourceMappingURL=user.js.map