import type { WebSocket } from "ws";

export async function onCloseHandler(
  this: WebSocket,
  code: number,
  reason: Buffer
) {
  console.log("connection is closed");
  console.log(`connection is closed due to  `);
}
