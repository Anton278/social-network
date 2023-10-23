import { createAsyncThunk } from "@reduxjs/toolkit";

import usersService from "@/services/Users";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const users = await usersService.getAll();
  return users;
});
