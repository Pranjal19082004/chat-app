import { createSlice } from "@reduxjs/toolkit";

const initialState: { username: string; userId: null | number } = {
  username: "",
  userId: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: ({ userId }, { payload }: { payload: { userId: number } }) => {
      userId = payload.userId;
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
