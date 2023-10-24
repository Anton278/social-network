import { ChatParticipant } from "./ChatParticipant";

interface Message {
  authorId: string;
  message: string;
  createdAt: string;
  lastEdited: string;
  isEdited: boolean;
}

export interface Chat {
  participants: ChatParticipant[];
  messages: Message[];
  id: string;
}
