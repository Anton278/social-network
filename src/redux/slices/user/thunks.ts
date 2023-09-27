import { User } from "@/models/User";
import { db } from "@/pages/_app";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

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
    return userDoc.data() as User;
  }
);
