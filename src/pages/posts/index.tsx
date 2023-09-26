import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import AddPost from "@/components/AddPost";
import FriendsPostsOver from "@/components/FriendsPostsOver";

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
        <FriendsPostsOver />
      </>
    </Layout>
  );
}

export default withProtected(Posts);
