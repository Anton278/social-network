import { Post } from "@/models/Post";
import { RequestStatus } from "@/models/RequestStatus";

export interface InitialState {
  posts: Post[];
  status: RequestStatus;
}
