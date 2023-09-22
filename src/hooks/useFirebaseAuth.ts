import { FirebaseContext } from "@/contexts/firebase";
import { useContext } from "react";

export function useFirebaseAuth() {
  const { auth, isAuthStateLoading } = useContext(FirebaseContext);

  return { auth, isLoading: isAuthStateLoading };
}
