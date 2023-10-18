interface Author {
  id: string;
  username: string;
  fullName: string;
}

export interface Comment {
  author: Author;
  comment: string;
  id: number;
  timestamp: number;
}
