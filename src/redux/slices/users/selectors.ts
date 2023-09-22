import { RootState } from "@/redux/store";

export const selectUsersDocs = (state: RootState) => state.users.usersDocs;
