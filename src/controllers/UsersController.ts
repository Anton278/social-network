import type {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import UsersService from "@/services/UsersService";
import type { CreateUserRequest } from "@/models/requests/createUser";
import { CreatedUser } from "@/models/responses/CreatedUser";

class UsersController {
  async getUsers(req: NextApiRequest, res: NextApiResponse, db: Firestore) {
    try {
      const users = await UsersService.getUsers(db);
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async createUser(
    req: CreateUserRequest,
    res: NextApiResponse<CreatedUser | unknown>,
    db: Firestore
  ) {
    try {
      const createdUser = await UsersService.createUser(db, req.body);
      res.status(200).json(createdUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UsersController();
