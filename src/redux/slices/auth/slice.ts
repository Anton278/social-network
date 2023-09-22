import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = { isAuthed: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthed(state, action: PayloadAction<boolean>) {
      state.isAuthed = action.payload;
      console.log("setIsAuthed payload ", action.payload);
    },
  },
});

export const { setIsAuthed } = authSlice.actions;

export default authSlice.reducer;
