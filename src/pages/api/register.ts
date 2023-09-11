import type { NextApiRequest, NextApiResponse } from "next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFbAuth } from "@/firebaseCfg";

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

  const auth = getFbAuth(process.env.FIREBASE_API_KEY);
  const { email, password } = req.body;

  try {
    const createUserRes = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = createUserRes;
    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.code });
  }
}
