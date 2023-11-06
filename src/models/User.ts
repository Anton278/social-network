import { Friend } from "./Friend";

export interface User {
  email: string;
  username: string;
  id: string;
  fullName: string;
  friends: Friend[];
  sentFriendsRequests: Friend[];
  receivedFriendsRequests: Friend[];
}
