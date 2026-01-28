import Dexie, { type Table } from "dexie";
export interface messageDb {
  id: number;
  groupId: number;
  senderId: number;
  content: string;
  sendTimeStamp: Date;
  ack: "SINGLE" | "DOUBLE" | "BLUE";
  deleted: boolean;
  senderUsername: string;
}
export interface groupDb {
  groupId: number;
  type: "SINGLE" | "GROUP";
  groupName: string;
  CreatedAt: string;
  //   latestMessage: string;
  //   updatedAt: Date;
  //   newMessageCount: number;
}

export class DB extends Dexie {
  messages!: Table<messageDb, number>;
  groups!: Table<groupDb, number>;
  constructor() {
    super("db");
    this.version(1).stores({
      messages: "id, groupId",
      groups: "groupId",
    });
  }
}
const db = new DB();

export default db;
