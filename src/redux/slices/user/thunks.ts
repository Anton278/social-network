import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";

import { UpdateUser } from "@/models/requests/UpdateUser";
import { db } from "@/pages/_app";
import { RootState } from "@/redux/store";
import usersService from "@/services/Users";

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

export const updateUser = createAsyncThunk<
  UpdateUser,
  UpdateUser,
  { state: RootState }
>("user/updateUser", async (user: UpdateUser, { getState }) => {
  const userId = getState().user.id;
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, { ...user });

  return user;
});
