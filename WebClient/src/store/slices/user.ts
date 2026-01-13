import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  username: string;
  userId: null | number;
  jwt: string;
  email: string;
} = {
  username: "",
  userId: null,
  jwt: localStorage.getItem("token")||"",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (
      state,
      {
        payload,
      }: {
        payload: {
          username?: string;
          userId?: number;
          jwt?: string;
          email?: string;
        };
      }
    ) => {
      return { ...state, ...payload };
    },
    setUserProperties(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { setUserName, setUserProperties: changeUserProperties } =
  userSlice.actions;
export default userSlice.reducer;
