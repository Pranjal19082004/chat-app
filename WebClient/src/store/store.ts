import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chat.js";
import userReducer from "./slices/user.js";
import contactReducer from "./slices/contacts.js";
import groupReducer from "./slices/groups.js";
export const store = configureStore({
  reducer: { chat: chatReducer, user: userReducer, contacts: contactReducer ,groups: groupReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
