import { ChatParticipant } from "./ChatParticipant";

export interface Message {
  authorId: string;
  message: string;
  timeStamp: number;
  isEdited: boolean;
  id: number;
}

export interface Chat {
  participants: ChatParticipant[];
  messages: Message[];
  id: string;
  lastMessage: string;
}
