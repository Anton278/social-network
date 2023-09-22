import { createContext } from "react";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

type FirebaseContextT = {
  auth: Auth;
  db: Firestore;
  isAuthStateLoading: boolean;
};

// @ts-ignore
export const FirebaseContext = createContext<FirebaseContextT>(null);
