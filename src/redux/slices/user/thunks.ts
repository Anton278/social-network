import { User } from "@/models/User";
import { UpdateUser } from "@/models/requests/UpdateUser";
import { db } from "@/pages/_app";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const getUser = createAsyncThunk(
  "getUser",
  async (userId: string, { rejectWithValue }) => {
    const usersDocs = (await getDocs(collection(db, "users"))).docs;
    const userDoc = usersDocs.find(
      (userDoc) => userDoc.data().userId === userId
    );
    if (!userDoc) {
      return rejectWithValue("error/user-not-found");
    }
    const user = { ...(userDoc.data() as User), docId: userDoc.id };
    return user;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: UpdateUser) => {
    const { docId, ...userWithoutDocId } = user;
    const docRef = doc(db, "users", docId);

    await updateDoc(docRef, userWithoutDocId);

    return userWithoutDocId;
  }
);
