import { User } from "@/models/User";
import { UpdateUser } from "@/models/requests/UpdateUser";
import { db } from "@/pages/_app";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

class UsersService {
  async getAll() {
    const users: User[] = [];
    const usersDocs = await getDocs(collection(db, "users"));
    usersDocs.forEach((userDoc) => {
      const user = userDoc.data() as User;
      users.push(user);
    });
    return users;
  }

  async getOne(id: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", id));
    const userDocs = (await getDocs(q)).docs;
    if (!userDocs[0]) {
      return Promise.reject("user with given id not found");
    }
    const user = userDocs[0].data() as User;
    return user;
  }

  async update(user: UpdateUser, id: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", id));
    const userDocs = (await getDocs(q)).docs;
    const userDoc = userDocs[0];
    if (!userDoc) {
      return Promise.reject("user with given id not found");
    }
    await updateDoc(userDoc.ref, { ...user });
    return user;
  }

  async create(email: string, username: string, fullName: string, id: string) {
    const user: User = {
      email,
      username,
      fullName,
      friends: [],
      sentFriendsRequests: [],
      receivedFriendsRequests: [],
      id,
    };
    await addDoc(collection(db, "users"), user);
    return user;
  }
}

const usersService = new UsersService();

export default usersService;
