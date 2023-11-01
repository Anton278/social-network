import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import { Chat } from "@/models/Chat";
import { ChatParticipant } from "@/models/ChatParticipant";
import { db } from "@/pages/_app";
import {
  createChat as createChatThunk,
  deleteChat,
} from "@/redux/slices/chats/thunks";
import { AppDispatch } from "@/redux/store";
import { User } from "@/models/User";
import { updateUser } from "@/redux/slices/user/thunks";

export async function createChat(
  user: User,
  interlocutor: ChatParticipant,
  userChats: Chat[],
  router: ReturnType<typeof useRouter>,
  dispatch: AppDispatch
) {
  const chat = userChats.find(
    (chat) =>
      chat.participants[0].id === interlocutor.id ||
      chat.participants[1].id === interlocutor.id
  );
  if (chat) {
    return router.push(`/chats/${chat.id}`);
  }
  let createdChat: Chat | undefined;
  const interlocutorDocRef = doc(db, "users", interlocutor.id);
  try {
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
    await dispatch(
      updateUser({ chats: [...user.chats, createdChat.id] })
    ).unwrap();
    await updateDoc(interlocutorDocRef, { chats: arrayUnion(createdChat.id) });
    router.push(`/chats/${createdChat.id}`);
  } catch (e) {
    if (!createdChat?.id) {
      return Promise.reject(e);
    }
    await dispatch(deleteChat(createdChat.id));
    await dispatch(updateUser({ chats: user.chats }));
    return Promise.reject(e);
  }
}
