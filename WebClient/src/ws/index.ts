// const token = localStorage.getItem("token");
// export const ws = new WebSocket(`ws://localhost:3000?token=${token}`);
// ws.onopen = function (this, ev) {
//   console.log(ev);
//   console.log("connected");
// };
// ws.onmessage = function (mssg: MessageEvent) {
//   console.log(mssg.data);
//   //   const { method, payload } = JSON.parse(mssg);
//   //   requestHandler[method]?.(payload);
// };
// ws.onclose = function (e) {
//   console.log("closed");
//   console.log(e);
// };
// ws.onerror = function () {
//   console.log("error");
// };
