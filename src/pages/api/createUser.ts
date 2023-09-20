import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

import { getFirebaseConfig } from "@/firebaseCfg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!process.env.FIREBASE_API_KEY) {
    return res
      .status(500)
      .json({ message: "Firebase api key is not provided" });
  }

  const firebaseConfig = getFirebaseConfig(process.env.FIREBASE_API_KEY);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { email, username, userId } = req.body;

  try {
    const docRef = await addDoc(collection(db, "users"), {
      email,
      username,
      userId,
    });
    res.status(200).json(docRef);
  } catch (e: any) {
    res.status(500).json({ message: e.code });
  }
}
