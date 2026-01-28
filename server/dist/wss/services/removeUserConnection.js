import WebSocket from "ws";
import UserConnections from "../store/user.js";
// always remember*** yeh function userId ko close karne ke kam ata hai userConnection se
// jabki removefrom everywhere har store se hata bhi deta hai fir yeh function call karta
export function removeUserConnection(userId) {
    const ws = UserConnections.get(userId);
    closeSocket(ws);
    UserConnections.delete(userId);
}
export function closeSocket(ws, code = 1000, mssg = "") {
    if (!ws)
        return;
    ws.removeAllListeners();
    if (ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING) {
        ws.close(code, mssg);
    }
}
//# sourceMappingURL=removeUserConnection.js.map