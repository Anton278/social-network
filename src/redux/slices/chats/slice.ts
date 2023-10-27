import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";
import { RequestStatus } from "@/models/RequestStatus";
import { addMessage, createChat, deleteChat, getChats } from "./thunks";

const initialState: InitialState = {
  status: RequestStatus.Loading,
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.status = RequestStatus.IDLE;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      state.status = RequestStatus.Error;
      console.error("getChats serialized error ", action.error);
    });

    builder.addCase(createChat.fulfilled, (state, action) => {
      state.chats.unshift(action.payload);
    });

    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    });

    builder.addCase(addMessage.fulfilled, (state, action) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === action.payload.id
      );
      if (chatIndex >= 0) {
        state.chats[chatIndex].messages.push(action.payload.message);
      }
    });
  },
});

export default chatsSlice.reducer;
