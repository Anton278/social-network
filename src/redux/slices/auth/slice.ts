import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "@/models/RequestStatus";

const initialState: InitialState = {
  isAuthed: false,
  status: RequestStatus.Loading,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthed(state, action: PayloadAction<boolean>) {
      state.isAuthed = action.payload;
      state.status = RequestStatus.IDLE;
    },
  },
});

export const { setIsAuthed } = authSlice.actions;

export default authSlice.reducer;
