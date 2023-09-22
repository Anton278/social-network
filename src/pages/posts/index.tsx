import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import type { Post } from "@/models/Post";
import * as Styled from "@/styles/Posts.styled";

const posts: Post[] = [
  {
    author: "Anton Nakonechnyi",
    authorId: "1",
    post: "Very first post. Hello!",
  },
  {
    author: "John Doe",
    authorId: "2",
    post: "Lorem ipsum dolor...",
  },
];

function Posts() {
  return (
    <Layout>
      <div>
        {posts.map((post, i) => (
          <div key={i}>
            <h5>{post.author}</h5>
            <p>{post.post}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default withProtected(Posts);
