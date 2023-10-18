import { Post } from "@/models/Post";
import { db } from "@/pages/_app";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

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
}

const postsService = new PostsService();

export default postsService;
