import { Friend } from "./Friend";

export interface User {
  email: string;
  username: string;
  userId: string;
  fullName: string;
  friends: Friend[];
  sentFriendsRequests: Friend[];
  friendsRequests: Friend[];
}
