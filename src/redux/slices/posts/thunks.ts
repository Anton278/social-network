import { createAsyncThunk } from "@reduxjs/toolkit";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import { db } from "@/pages/_app";
import { UpdatePost } from "@/models/requests/UpdatePost";
import { AddPost } from "@/models/requests/AddPost";
import postsService from "@/services/Posts";

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
    const updatedPost = postsService.update(post);
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
