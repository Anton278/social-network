import { Friend } from "../Friend";

export interface UpdateUser {
  email?: string;
  fullName?: string;
  friends?: Friend[];
  sentFriendsRequests?: Friend[];
  receivedFriendsRequests?: Friend[];
  chats?: string[];
}
