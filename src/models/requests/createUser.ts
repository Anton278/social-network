import type { NextApiRequest } from "next";
import type { User } from "../User";

export interface CreateUserRequest extends NextApiRequest {
  body: User;
}
