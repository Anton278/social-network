import { Comment } from "./Comment";

interface Author {
  username: string;
  fullName: string;
  userId: string;
}

export interface Post {
  author: Author;
  body: string;
  comments: Comment[];
  timeStamp: string;
}
