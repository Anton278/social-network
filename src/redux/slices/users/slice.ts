import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import { getUsers } from "./thunks";
import { RequestStatus } from "@/models/RequestStatus";

const initialState: InitialState = {
  status: RequestStatus.Loading,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = RequestStatus.IDLE;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = RequestStatus.Error;
    });
  },
});

export default usersSlice.reducer;
