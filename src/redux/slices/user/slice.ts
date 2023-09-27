import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "./thunks";
import { RequestStatus } from "@/models/RequestStatus";
import { User } from "@/models/User";

const initialState: InitialState = {
  status: RequestStatus.Loading,
  email: "",
  username: "",
  userId: "",
  fullName: "",
  posts: [],
  friends: [],
  sentFriendsRequests: [],
  friendsRequests: [],
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
    builder.addCase(getUser.fulfilled, (_, action) => {
      return { status: RequestStatus.IDLE, ...action.payload };
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
