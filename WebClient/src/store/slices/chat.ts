import { createSlice } from "@reduxjs/toolkit";
interface message {
  id: number;
  content: string;
  senderId: number;
  sendTimeStamp: Date;
  ack: "SINGLE" | "DOUBLE" | "BLUE";
  deleted: boolean;
  senderUsername:string
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
      console.log(payload);
      return { ...chat, messages: [...chat.messages, payload] };
    },
  },
});

export const { changeChat, addChat } = chatSlice.actions;
export default chatSlice.reducer;
