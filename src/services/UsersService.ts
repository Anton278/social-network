import type { Firestore } from "firebase/firestore";
import { getDocs, collection, addDoc } from "firebase/firestore";

import type { User } from "@/models/User";

class UsersService {
  async getUsers(db: Firestore) {
    const usersDocs = (await getDocs(collection(db, "users"))).docs;
    const users = usersDocs.map((userDoc) => userDoc.data());

    return users;
  }
  async createUser(db: Firestore, user: User) {
    const userDocRef = await addDoc(collection(db, "users"), user);
    return { ...user, id: userDocRef.id };
  }
}

export default new UsersService();
