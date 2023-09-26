import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import AddPost from "@/components/AddPost";

const posts = [
  {
    author: { username: "anton278", fullName: "Anton Nakonechnyi" },
    authorId: "1",
    post: "Very first post. Hello!",
  },
  {
    author: { username: "john001", fullName: "John Doe" },
    authorId: "2",
    post: "Lorem ipsum dolor...",
  },
];

function Posts() {
  return (
    <Layout>
      <>
        <AddPost />
        <div>
          {posts.map((post, i) => (
            <Post key={i} author={post.author} text={post.post} date="" />
          ))}
        </div>
      </>
    </Layout>
  );
}

export default withProtected(Posts);
