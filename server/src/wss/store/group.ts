import type { WebSocket } from "ws";
import { number } from "zod";
let mp = new Map<number, Set<number> | undefined>();
const groupFunctions = {
  get: (groupId: number): Set<number> | undefined => mp.get(groupId),
  set: (groupId: number, userId: number): void => {
    if (typeof mp.get(groupId) != "undefined") {
      mp.get(groupId)?.add(userId);
    } else {
      mp.set(groupId, new Set<number>([userId]));
    }
  },
  delete: (groupId: number, userId: number): void => {
    try {
      mp.get(groupId)?.delete(userId);
      if (!mp.get(groupId)?.size) {
        mp.delete(groupId);
      }
    } catch (e) {}
  },
  deleteGroup: (groupId: number): void => {
    try {
      mp.delete(groupId);
    } catch (e) {}
  },
};

const Groups = Object.freeze(groupFunctions);
export default Groups;
