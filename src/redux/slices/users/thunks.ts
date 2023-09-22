import { createAsyncThunk } from "@reduxjs/toolkit";
import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import { collection, getDocs } from "firebase/firestore";

export const getUsers = createAsyncThunk("/getUsers", async ({}, {}) => {
  const { db } = useFirebaseDB();
  const usersDocs = (await getDocs(collection(db, "users"))).docs;
  return usersDocs;
});
