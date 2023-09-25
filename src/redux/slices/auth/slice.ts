import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = { isAuthed: false, userId: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthed(state, action: PayloadAction<boolean>) {
      state.isAuthed = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export const { setIsAuthed, setUserId } = authSlice.actions;

export default authSlice.reducer;
