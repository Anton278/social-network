import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";
import { RequestStatus } from "@/models/RequestStatus";
import {
  addPost,
  getPosts,
  updatePost,
  deletePost,
  deleteComment,
} from "./thunks";

const initialState: InitialState = {
  posts: [],
  status: RequestStatus.Loading,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = RequestStatus.IDLE;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.status = RequestStatus.Error;
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      const payload = action.payload;
      const { id, ...payloadWithoutId } = payload;
      state.posts = state.posts.map((post) =>
        post.id === payload.id ? { ...post, ...payloadWithoutId } : post
      );
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });

    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post.id === payload.id ? { ...post, ...payload } : post
      );
    });
  },
});

export default postsSlice.reducer;
