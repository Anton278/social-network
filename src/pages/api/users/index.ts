import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getFirebaseConfig } from "@/utils/getFirebaseConfig";
import UsersController from "@/controllers/UsersController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.FIREBASE_API_KEY) {
    return res
      .status(500)
      .json({ message: "Firebase api key is not provided" });
  }

  const firebaseConfig = getFirebaseConfig(process.env.FIREBASE_API_KEY);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  switch (req.method) {
    case "GET":
      await UsersController.getUsers(req, res, db);
      break;
    case "POST":
      await UsersController.createUser(req, res, db);
      break;
  }
}
