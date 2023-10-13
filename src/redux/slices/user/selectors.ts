import { RootState } from "@/redux/store";

export const selectUserId = (state: RootState) => state.user.id;
