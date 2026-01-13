import { createSlice } from "@reduxjs/toolkit";
const initialState: { groupId: number; groupName: string }[] = [];
const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    replaceGroupList: (
      _,
      { payload }: { payload: { groupName: string; groupId: number }[] }
    ) => {
      return payload.map((x) => {
       return{groupId: x.groupId, groupName:x.groupName}
      });
    },
  },
});

export const { replaceGroupList } = groupSlice.actions;
export default groupSlice.reducer;
