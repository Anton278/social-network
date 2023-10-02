import { Comment } from "../Comment";

export interface UpdatePost {
  postId: string;
  comments: Comment[];
}
