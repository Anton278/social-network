interface Friend {}

export interface User {
  email: string;
  username: string;
  userId: string;
  fullName: string;
  posts: string[];
  friends: Friend[];
}
