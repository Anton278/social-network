import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import type {
  DocumentData,
  Firestore,
  QuerySnapshot,
} from "firebase/firestore";

import { getFirebaseConfig } from "@/firebaseCfg";
import UsersController from "@/controllers/UsersController";
import { User } from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string } | any>
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
