import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chat.js";
import userReducer from "./slices/user.js";
import contactReducer from "./slices/contacts.js";
import groupReducer from "./slices/groups.js";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/index.js";
const sagaMiddleware = createSagaMiddleware();
console.log("in store.js")
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
    contacts: contactReducer,
    groups: groupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
console.log("out of store")
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
