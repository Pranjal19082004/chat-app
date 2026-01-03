import { createSlice } from "@reduxjs/toolkit";
const initialState: { groupId: number; groupName: string }[] = [];
const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    changeGroupList: (
      curr,
      { payload }: { payload: { groupId: number; groupName: string }[] }
    ) => {
      curr = payload;
    },
  },
});

export const { changeGroupList } = groupSlice.actions;
export default groupSlice.reducer;
