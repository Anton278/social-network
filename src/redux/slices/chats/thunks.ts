import { ChatParticipant } from "@/models/ChatParticipant";
import chatsService from "@/services/Chats";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChats = createAsyncThunk("chats/getChats", async () => {
  const chats = await chatsService.getAll();
  return chats;
});

export const createChat = createAsyncThunk(
  "chats/createChat",
  async (participants: ChatParticipant[]) => {
    const createdChat = await chatsService.create(participants);
    return createdChat;
  }
);

export const deleteChat = createAsyncThunk(
  "chats/deleteChat",
  async (id: string) => {
    const deletedChatId = await chatsService.delete(id);
    return deletedChatId;
  }
);
