import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUser, updateUser } from "./thunks";
import { RequestStatus } from "@/models/RequestStatus";
import { User } from "@/models/User";

const initialState: InitialState = {
  status: RequestStatus.Loading,
  email: "",
  username: "",
  id: "",
  fullName: "",
  friends: [],
  sentFriendsRequests: [],
  receivedFriendsRequests: [],
  watchedPosts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return { ...state, status: RequestStatus.IDLE, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return { ...state, status: RequestStatus.IDLE, ...action.payload };
    });
    builder.addCase(getUser.rejected, (state) => {
      state.status = RequestStatus.Error;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default userSlice.reducer;
