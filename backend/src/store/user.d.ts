import type { WebSocket } from 'ws';
declare const UserConnections: Readonly<{
    get: (userId: number) => WebSocket | undefined;
    set: (userId: number, s: WebSocket) => void;
    delete: (userID: number) => void;
}>;
export default UserConnections;
//# sourceMappingURL=user.d.ts.map