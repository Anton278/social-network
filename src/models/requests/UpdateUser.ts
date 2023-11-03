import { Friend } from "../Friend";
import { arrayUnion } from "firebase/firestore";

export interface UpdateUser {
  email?: string;
  fullName?: string;
  friends?: Friend[] | ReturnType<typeof arrayUnion>;
  sentFriendsRequests?: Friend[];
  receivedFriendsRequests?: Friend[] | ReturnType<typeof arrayUnion>;
  chats?: string[] | ReturnType<typeof arrayUnion>;
}
