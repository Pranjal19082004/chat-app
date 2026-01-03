import { createSlice } from "@reduxjs/toolkit";
interface message {
  id: number;
  content: string;
  senderId: number;
  sendTimeStamp: Date;
  ack: "SINGLE" | "DOUBLE" | "BLUE";
  deleted: boolean;
}

const initialState: {
  groupId: number | null;
  type: "SINGLE" | "GROUP";
  stale: boolean;
  messages: message[];
} = {
  groupId: null,
  type: "SINGLE",
  stale: false,
  messages: [],
};
const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers:{
	changeChatId :(curr,{payload}:{payload:{groupId:number}})=>{
		curr.groupId  = payload.groupId;
	}
  }
});

export const {changeChatId}= chatSlice.actions
export default chatSlice.reducer