import { db } from "@/pages/_app";
import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

class UserService {
  async getUserDoc(userId: string) {
    const userQuery = query(
      collection(db, "users"),
      where("userId", "==", userId)
    );

    const userDoc = (await getDocs(userQuery)).docs[0];
    return userDoc;
  }

  async addFriend(
    userDoc: QueryDocumentSnapshot<DocumentData, DocumentData>,
    friendDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
  ) {
    const userId = userDoc.data().userId;
    const friendId = friendDoc.data().userId;

    await updateDoc(friendDoc.ref, {
      friendsRequests: arrayUnion(userId),
    });
    await updateDoc(userDoc.ref, {
      sentFriendsRequests: arrayUnion(friendId),
    });
  }
}

export default new UserService();
