import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/pages/_app";
import { Post } from "@/models/Post";
import { UpdatePost } from "@/models/requests/UpdatePost";
import { AddPost } from "@/models/requests/AddPost";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const postsDocs = (await getDocs(collection(db, "posts"))).docs;
  const posts = postsDocs.map((postDoc) => {
    const post = postDoc.data();
    return { ...post, id: postDoc.id, timeStamp: post.timeStamp.toJSON() };
  }) as Post[];
  return posts;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: UpdatePost) => {
    const docRef = doc(db, "posts", post.postId);
    await updateDoc(docRef, {
      comments: post.comments,
    });

    return post;
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
