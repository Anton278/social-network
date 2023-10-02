import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/pages/_app";
import { Post } from "@/models/Post";
import { UpdatePost } from "@/models/requests/UpdatePost";

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
