import type { WebSocket } from "ws";
let mp = new Map<number, number[] | undefined>();
const groupFunctions = {
  get: (groupId: number): number[] | undefined => mp.get(groupId),
  set: (groupId: number, userId: number): void => {
    if (typeof mp.get(groupId) != "undefined") {
      mp.get(userId);
    } else {
      mp.set(groupId, [userId]);
    }
  },
  delete: (groupId: number, userId: number): void => {
    try {
      mp.delete(groupId);
    } catch (e) {}
  },
};

const Groups = Object.freeze(groupFunctions);
export default Groups;
