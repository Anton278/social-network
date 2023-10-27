import { ChatParticipant } from "./ChatParticipant";

export interface Message {
  authorId: string;
  message: string;
  createdAt: string;
  lastEdited: string;
  isEdited: boolean;
  id: string;
}

export interface Chat {
  participants: ChatParticipant[];
  messages: Message[];
  id: string;
}
