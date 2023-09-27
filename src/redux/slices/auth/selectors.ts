import { RootState } from "@/redux/store";

export const selectIsAuthed = (state: RootState) => state.auth.isAuthed;
export const selectAuthStatus = (state: RootState) => state.auth.status;
