import { createSlice } from "@reduxjs/toolkit";
interface message {
  id: number;
  content: string;
  senderId: number;
  sendTimeStamp: Date;
  ack: "SINGLE" | "DOUBLE" | "BLUE";
  deleted: boolean;
}
interface chatSchema {
  groupId: number | null;
  type: "SINGLE" | "GROUP";
  messages: message[];
  groupName: string;
}
const initialState: chatSchema = {
  groupId: null,
  type: "SINGLE",
  messages: [],
  groupName: "",
};
const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    changeChat(_, { payload }: { payload: chatSchema }) {
      return { ...payload };
    },
    addChat(chat, { payload }) {
      chat.messages.push(payload);
      return chat;
    },
  },
});

export const { changeChat ,addChat } = chatSlice.actions;
export default chatSlice.reducer;
