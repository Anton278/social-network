import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/pages/_app";

class AuthService {
  async register(email: string, password: string) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  }

  async delete() {
    if (!auth.currentUser) {
      throw new Error("User is not logged in");
    }
    await deleteUser(auth.currentUser);
  }

  async login(email: string, password: string) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  }

  async logout() {
    const res = await signOut(auth);
    return res;
  }
}

const authService = new AuthService();

export default authService;
