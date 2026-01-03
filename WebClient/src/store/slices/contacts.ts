import { createSlice } from "@reduxjs/toolkit";
const initialState: { contactId: number; contactName: string }[] = [];
const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    changeContactList: (
      curr,
      { payload }: { payload: { contactId: number; contactName: string }[] }
    ) => {
      curr = payload;
    },
  },
});

export const { changeContactList } = contactSlice.actions;
export default contactSlice.reducer;
