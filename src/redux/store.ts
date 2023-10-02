import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/slice";
import usersReducer from "./slices/users/slice";
import userReducer from "./slices/user/slice";
import postsReducer from "./slices/posts/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
