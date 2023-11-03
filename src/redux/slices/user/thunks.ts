import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUser } from "@/models/requests/UpdateUser";
import { RootState } from "@/redux/store";
import usersService from "@/services/Users";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id: string, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue("id is not provided!");
    }
    const user = await usersService.getOne(id);
    return user;
  }
);

export const updateUser = createAsyncThunk<
  UpdateUser,
  UpdateUser,
  { state: RootState }
>("user/updateUser", async (user: UpdateUser, { getState }) => {
  const userId = getState().user.id;
  await usersService.update(user, userId);
  return user;
});
