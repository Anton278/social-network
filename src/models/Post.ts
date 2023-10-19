import type { Timestamp } from "firebase/firestore";
import { Comment } from "./Comment";

interface Author {
  username: string;
  fullName: string;
  id: string;
}

export interface Post {
  author: Author;
  body: string;
  comments: Comment[];
  timeStamp: Timestamp;
  isPrivate: boolean;
  id: string;
  isEdited: boolean;
}
