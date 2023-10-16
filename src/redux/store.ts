import { configureStore } from "@reduxjs/toolkit";
import type {
  CombinedState,
  PreloadedState,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import authReducer from "./slices/auth/slice";
import usersReducer from "./slices/users/slice";
import userReducer from "./slices/user/slice";
import postsReducer from "./slices/posts/slice";

const reducer = {
  auth: authReducer,
  users: usersReducer,
  user: userReducer,
  posts: postsReducer,
};

export function makeStore(
  preloadedState?: PreloadedState<CombinedState<RootState>>
) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

const store = makeStore();

export type RootState = StateFromReducersMapObject<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
