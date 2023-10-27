import { Message } from "@/models/Chat";
import { ChatParticipant } from "@/models/ChatParticipant";
import { RootState } from "@/redux/store";
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

type AddMessagePayload = {
  id: string;
  message: Message;
};

export const addMessage = createAsyncThunk<
  AddMessagePayload,
  AddMessagePayload,
  { state: RootState }
>("chats/addMessage", async ({ id, message }) => {
  await chatsService.addMessage({ id, message });
  return { id, message };
});
