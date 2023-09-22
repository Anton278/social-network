import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import { getUsers } from "./thunks";

const initialState: InitialState = {
  usersDocs: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.usersDocs = action.payload;
    });
  },
});

export default usersSlice.reducer;
