import {
  END,
  eventChannel,
  type SagaIterator,
} from "redux-saga";
import {
  call,
  take,
  put,
  delay,
  actionChannel,
  race,
} from "redux-saga/effects";
import { SOCKET_CONNECTED } from "../actions";
let ws: WebSocket;
// takes a websocket  and make a channel
function eventChannelCreator(ws: WebSocket) {
  return eventChannel((emitter) => {
    ws.onmessage = (ev) => {
      const mssg = JSON.parse(ev.data);
      emitter({ ...mssg, type: mssg.method });
    };
    ws.onclose = () => emitter(END);
    return () => ws.close();
  });
}

// take a websocket and start
export default function* watcherWebSocket(): SagaIterator {
  try {
    console.log("entered wtacherWebSocket");
    while (true) {
      let token = localStorage.getItem("token");
      if (!token) {
        yield take("LOGIN_SUCCESSFUL");
        token = localStorage.getItem("token");
      }
      let ws = new WebSocket(
        `ws://${import.meta.env.VITE_API_URL}?token=${token}`,
      );
      yield delay(1000);
      //   wait before retry
      while (ws.readyState != WebSocket.OPEN) {
        ws = new WebSocket(`ws://${import.meta.env.VITE_API_URL}?token=${token}`);
        yield delay(3000);
      }

      const eventChannel = yield call(eventChannelCreator, ws);
      const actChannel = yield actionChannel("SEND_MESSAGE_TO_WS");
      yield put(SOCKET_CONNECTED());
      try {
        while (true) {
          const { eventAction, action } = yield race({
            eventAction: take(eventChannel),
            action: take(actChannel),
          });
          if (eventAction) {
            yield put(eventAction);
          }
          if (action) {
            const { payload } = action;
            console.log("payload----->");
            console.log(payload);
            ws.send(payload.message);
          }
        }
      } finally {
        eventChannel.close();
      }
    }
  } catch (e) {
    console.log("error");
    console.log(e);
    if (e instanceof Error) {
      console.log(e.message);
      return;
    }
  }
}
