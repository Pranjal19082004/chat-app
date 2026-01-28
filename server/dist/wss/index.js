import { WebSocketServer } from "ws";
import { onConnect } from "./handlers/onConnect.js";
import router from "./routes/index.js";
import { wsMessageSchema } from "../types/wsTypes.js";
function initWebSocketServer(server) {
    const wss = new WebSocketServer({ server });
    wss.on("connection", async (ws, req) => {
        await onConnect(ws, req);
    });
    return wss;
}
export default initWebSocketServer;
//# sourceMappingURL=index.js.map