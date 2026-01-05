import Dexie from "dexie";
export const db = new Dexie("chat-app");
db.version(1).stores({
  contact: "id",
  group: "id",
  messages: "id",
  user: "id",
});
