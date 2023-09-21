import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseConfig } from "@/utils/getFirebaseConfig";
import { initializeApp } from "firebase/app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!process.env.FIREBASE_API_KEY) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  const firebaseConfig = getFirebaseConfig(process.env.FIREBASE_API_KEY);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { email, password } = req.body;

  try {
    const loginRes = await signInWithEmailAndPassword(auth, email, password);
    const { user } = loginRes;

    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.code });
  }
}
