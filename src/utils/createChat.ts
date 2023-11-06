import { useRouter } from "next/router";

import { Chat } from "@/models/Chat";
import { ChatParticipant } from "@/models/ChatParticipant";
import { createChat as createChatThunk } from "@/redux/slices/chats/thunks";
import { AppDispatch } from "@/redux/store";
import { User } from "@/models/User";

export async function createChat(
  user: User,
  interlocutor: ChatParticipant,
  chats: Chat[],
  router: ReturnType<typeof useRouter>,
  dispatch: AppDispatch
) {
  const chat = chats.find(
    (chat) =>
      chat.participants[0].id === interlocutor.id ||
      chat.participants[1].id === interlocutor.id
  );
  if (chat) {
    return router.push(`/chats/${chat.id}`);
  }
  let createdChat: Chat | undefined;
  createdChat = await dispatch(
    createChatThunk([
      interlocutor,
      {
        fullName: user.fullName,
        username: user.username,
        id: user.id,
      },
    ])
  ).unwrap();
  router.push(`/chats/${createdChat.id}`);
}
