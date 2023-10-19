import { Comment } from "../Comment";

export interface UpdatePost {
  id: string;
  comments?: Comment[];
  isPrivate?: boolean;
  body?: string;
  isEdited: boolean;
}
