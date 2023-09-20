import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { getAuth, deleteUser } from "firebase/auth";

import { getFirebaseConfig } from "@/utils/getFirebaseConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!process.env.FIREBASE_API_KEY) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  const firebaseConfig = getFirebaseConfig(process.env.FIREBASE_API_KEY);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  const userId = user.uid;

  try {
    await deleteUser(user);
    res.status(200).json({
      message: `Successfully deleted user #${userId} from auth system`,
    });
  } catch (e: any) {
    res.status(500).json(e);
  }
}
