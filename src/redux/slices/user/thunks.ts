import { UpdateUser } from "@/models/requests/UpdateUser";
import { db } from "@/pages/_app";
import usersService from "@/services/Users";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (email: string | null, { rejectWithValue }) => {
    if (!email) {
      return rejectWithValue("email is not provided!");
    }
    const users = await usersService.getAll();
    const user = users.find((user) => user.email === email);
    if (!user) {
      return rejectWithValue("error/user-not-found");
    }
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
