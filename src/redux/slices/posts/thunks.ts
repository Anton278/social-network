import { createAsyncThunk } from "@reduxjs/toolkit";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import { db } from "@/pages/_app";
import { UpdatePost } from "@/models/requests/UpdatePost";
import { AddPost } from "@/models/requests/AddPost";
import postsService from "@/services/Posts";
import { RootState } from "@/redux/store";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const posts = await postsService.getAll();
  return posts;
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await postsService.delete(id);
    return id;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: UpdatePost) => {
    const updatedPost = await postsService.update(post);
    return updatedPost;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: AddPost) => {
    const postDocRef = await addDoc(collection(db, "posts"), post);

    const addedPost = {
      ...post,
      id: postDocRef.id,
      timeStamp: {
        seconds: Date.now() / 1000,
        nanoseconds: 0,
      } as Timestamp,
    };
    return addedPost;
  }
);

type DeleteCommentPayload = { postId: string; commentId: number };

export const deleteComment = createAsyncThunk<
  UpdatePost,
  DeleteCommentPayload,
  { state: RootState }
>(
  "posts/deleteComment",
  async ({ postId, commentId }, { getState, rejectWithValue }) => {
    const posts = getState().posts.posts;
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      return rejectWithValue("Post doesn't exist");
    }
    const updatedComments = post.comments.filter(
      (comment) => comment.id !== commentId
    );
    const updatedPost = await postsService.update({
      id: postId,
      comments: updatedComments,
    });
    return updatedPost;
  }
);
