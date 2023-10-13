import { User } from "@/models/User";
import { UpdateUser } from "@/models/requests/UpdateUser";
import { db } from "@/pages/_app";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const getUser = createAsyncThunk(
  "getUser",
  async (email: string | null, { rejectWithValue }) => {
    if (!email) {
      return rejectWithValue("email is not provided!");
    }
    const usersDocs = (await getDocs(collection(db, "users"))).docs;
    const userDoc = usersDocs.find((userDoc) => userDoc.data().email === email);
    if (!userDoc) {
      return rejectWithValue("error/user-not-found");
    }
    const user = { ...userDoc.data(), id: userDoc.id };
    return user;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: UpdateUser) => {
    const { id, ...userWithoutId } = user;
    const docRef = doc(db, "users", id);

    await updateDoc(docRef, userWithoutId);

    return userWithoutId;
  }
);
