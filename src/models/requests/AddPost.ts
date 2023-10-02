import type { Timestamp } from "firebase/firestore";
import { Comment } from "../Comment";

interface Author {
  username: string;
  fullName: string;
  userId: string;
}

export interface AddPost {
  author: Author;
  body: string;
  comments: Comment[];
  timeStamp: Timestamp;
  isPrivate: boolean;
}
