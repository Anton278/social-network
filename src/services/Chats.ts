import { Chat, Message } from "@/models/Chat";
import { ChatParticipant } from "@/models/ChatParticipant";
import { db } from "@/pages/_app";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
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
    const chat = {
      messages: [],
      participants,
      lastMessage: "",
      createdAt: new Date().toISOString(),
    };
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

  async addMessage({ id, message }: { id: string; message: Message }) {
    const docRef = doc(db, "chats", id);
    await updateDoc(docRef, {
      messages: arrayUnion(message),
      lastMessage: message.message,
    });
    return { id, message };
  }
}

const chatsService = new ChatsService();
export default chatsService;
