import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/pages/_app";
import { collection, getDocs } from "firebase/firestore";

export const getUsers = createAsyncThunk("/getUsers", async () => {
  const usersDocs = (await getDocs(collection(db, "users"))).docs;
  return usersDocs;
});
