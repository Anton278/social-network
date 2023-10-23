import { Post } from "@/models/Post";
import { AddPost } from "@/models/requests/AddPost";
import { UpdatePost } from "@/models/requests/UpdatePost";
import { db } from "@/pages/_app";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

class PostsService {
  async getAll() {
    const posts: Post[] = [];
    const postsDocs = await getDocs(collection(db, "posts"));
    postsDocs.forEach((postsDoc) => {
      const postWithoutId = postsDoc.data();
      const post = {
        ...postWithoutId,
        id: postsDoc.id,
        timeStamp: postWithoutId.timeStamp.toJSON(),
      } as Post;
      posts.push(post);
    });
    return posts;
  }

  async delete(id: string) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  }

  async update(post: UpdatePost) {
    const { id, ...postWithoutId } = post;
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, postWithoutId);
    return post;
  }

  async create(post: AddPost) {
    const postDocRef = await addDoc(collection(db, "posts"), post);

    const addedPost: Post = {
      ...post,
      id: postDocRef.id,
      timeStamp: {
        seconds: Date.now() / 1000,
        nanoseconds: 0,
      } as Timestamp,
    };
    return addedPost;
  }
}

const postsService = new PostsService();

export default postsService;
