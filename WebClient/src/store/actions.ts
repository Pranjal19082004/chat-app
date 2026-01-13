import { createAction } from "@reduxjs/toolkit";

// file for actions

export const LOGIN_SUCCESSFUL = createAction<{
  username: string;
  userId: number;
  token: string;
}>("LOGIN_SUCCESSFUL");
export const CHANGE_CHAT = createAction<{ groupId: number; groupName: string }>(
  "CHANGE_CHAT"
);

export const SOCKET_CONNECTED = createAction("SOCKET_CONNECTED");
export const SEND_MESSAGE_TO_WS = createAction<{ message: string }>(
  "SEND_MESSAGE_TO_WS"
);
