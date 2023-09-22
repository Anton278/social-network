import { FirebaseContext } from "@/contexts/firebase";
import { useContext } from "react";

export function useFirebaseDB() {
  const { db } = useContext(FirebaseContext);
  return { db };
}
