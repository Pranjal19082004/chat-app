import { WebSocketServer, type RawData } from "ws";
import { onConnect } from "./wss/handlers/onConnect.js";
import router from "./wss/routes/index.js";
import { z } from "zod";
import { wsMessageSchema, WsMssgMethodsArray } from "./types/wsTypes.js";

function initWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", async (ws, req) => {
    try {
      await onConnect(ws, req);
      ws.on("message", (data: RawData) => {
        const { method, payload } = wsMessageSchema.parse(
          JSON.parse(data.toString())
        );
        router[method]?.(payload, ws);
      });
    } catch (e) {
      console.log(e);
    }
  });
  return wss;
}
export default initWebSocketServer;
