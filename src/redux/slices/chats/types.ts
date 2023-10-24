import { Chat } from "@/models/Chat";
import { RequestStatus } from "@/models/RequestStatus";

export interface InitialState {
  status: RequestStatus;
  chats: Chat[];
}
