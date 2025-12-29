import { WebSocketServer } from 'ws';
import { onConnect } from './handlers/onConnect.js';
function initWebSocketServer(server) {
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws, req) => {
        try {
            onConnect(ws, req);
            ws.on();
        }
        catch (e) {
            console.log(e);
        }
    });
    return wss;
}
export default initWebSocketServer;
//# sourceMappingURL=index.js.map