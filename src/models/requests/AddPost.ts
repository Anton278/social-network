import type { Timestamp } from "firebase/firestore";
import { Comment } from "../Comment";

interface Author {
  username: string;
  fullName: string;
  id: string;
}

export interface AddPost {
  author: Author;
  body: string;
  comments: Comment[];
  timeStamp: Timestamp;
  isPrivate: boolean;
  isEdited: boolean;
}
