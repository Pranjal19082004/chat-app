import type { WebSocket } from 'ws';
let mp = new Map<number, WebSocket | undefined>();
const UsersFunctions = {
  get: (userId: number): WebSocket | undefined => mp.get(userId),
  set: (userId: number, s: WebSocket): void => {
    mp.set(userId, s);
  },
  delete: (userID: number): void => {
    mp.delete(userID);
  },
};

const UserConnections = Object.freeze(UsersFunctions);
export default UserConnections;
