import { Friend } from "../Friend";

export interface UpdateUser {
  id: string;
  email?: string;
  fullName?: string;
  friends?: Friend[];
  sentFriendsRequests?: Friend[];
  receivedFriendsRequests?: Friend[];
}
