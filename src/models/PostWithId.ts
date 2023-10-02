import { Post } from "./Post";

export interface PostWithId extends Post {
  id: string;
}
