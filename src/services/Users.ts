import { User } from "@/models/User";
import { db } from "@/pages/_app";
import { addDoc, collection, getDocs } from "firebase/firestore";

class UsersService {
  async getAll() {
    const users: User[] = [];
    const usersDocs = await getDocs(collection(db, "users"));
    usersDocs.forEach((userDoc) => {
      const userWithoutId = userDoc.data();
      const user = { ...userWithoutId, id: userDoc.id } as User;
      users.push(user);
    });
    return users;
  }

  async create(email: string, username: string, fullName: string, id: string) {
    const user: User = {
      email,
      username,
      fullName,
      friends: [],
      sentFriendsRequests: [],
      receivedFriendsRequests: [],
      chats: [],
      id,
    };
    await addDoc(collection(db, "users"), user);
    return user;
  }
}

const usersService = new UsersService();

export default usersService;
