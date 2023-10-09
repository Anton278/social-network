import { Friend } from "../Friend";

export interface UpdateUser {
  docId: string;
  email?: string;
  fullName?: string;
  friends?: Friend[];
  sentFriendsRequests?: Friend[];
  friendsRequests?: Friend[];
}
