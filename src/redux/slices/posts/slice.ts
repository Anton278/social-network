import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";
import { RequestStatus } from "@/models/RequestStatus";
import { addPost, getPosts, updatePost } from "./thunks";

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
      const updatedPost = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      if (!updatedPost) {
        return state;
      }
      updatedPost.comments = action.payload.comments;
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });
  },
});

export default postsSlice.reducer;
