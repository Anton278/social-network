import { Chat } from "@/models/Chat";
import { ChatParticipant } from "@/models/ChatParticipant";
import { db } from "@/pages/_app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

class ChatsService {
  async getAll() {
    const chats: Chat[] = [];
    const chatsDocs = await getDocs(collection(db, "chats"));
    chatsDocs.forEach((chatDoc) => {
      const chatWithoutId = chatDoc.data();
      const chat = {
        ...chatWithoutId,
        id: chatDoc.id,
      } as Chat;
      chats.push(chat);
    });
    return chats;
  }

  async create(participants: ChatParticipant[]) {
    const chat: Chat = { id: "", messages: [], participants };
    const chatDocRef = await addDoc(collection(db, "chats"), chat);

    const createdChat: Chat = {
      ...chat,
      id: chatDocRef.id,
    };
    return createdChat;
  }

  async delete(id: string) {
    const docRef = doc(db, "chats", id);
    await deleteDoc(docRef);
    return id;
  }
}

const chatsService = new ChatsService();
export default chatsService;
