import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { cnt: 0 },
  reducers: {
    inc: (st, ac) => {
      st.cnt = st.cnt + 1;
      console.log(ac.payload);
      console.log(ac.type);
    },
  },
});
export const { inc } = counterSlice.actions;
export default counterSlice.reducer;