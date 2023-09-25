import { RootState } from "@/redux/store";

export const selectUsersDocs = (state: RootState) => state.users.usersDocs;
export const selectUsersStatus = (state: RootState) => state.users.status;
