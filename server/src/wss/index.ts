import { WebSocketServer, type RawData } from "ws";
import { onConnect } from "./handlers/onConnect.js";
import router from "./routes/index.js";
import { wsMessageSchema } from "../types/wsTypes.js";

function initWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", async (ws, req) => {
    try {
      await onConnect(ws, req);
      ws.on("message", (data: RawData) => {
        console.log("process was here --->");
        const { method, payload } = wsMessageSchema.parse(
          JSON.parse(data.toString())
        );
        console.log(payload);
        router[method]?.(payload, ws);
      });
    } catch (e) {
      console.log(e);
    }
  });
  return wss;
}
export default initWebSocketServer;
