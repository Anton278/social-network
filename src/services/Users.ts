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

  async create(email: string, username: string, fullName: string) {
    const user = {
      email,
      username,
      fullName,
      friends: [],
      sentFriendsRequests: [],
      receivedFriendsRequests: [],
    };
    const userDocRef = await addDoc(collection(db, "users"), user);
    const createdUser = { ...user, id: userDocRef.id } as User;
    return createdUser;
  }
}

const usersService = new UsersService();

export default usersService;
