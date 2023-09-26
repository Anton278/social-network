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
    comments: [
      {
        userId: "CwYS23Q87iOxCpHCTU1qlzDka263",
        username: "john001",
        comment: "Comment 1",
        id: "1",
        fullName: "John Doe",
      },
      {
        userId: "CwYS23Q87iOxCpHCTU1qlzDka263",
        username: "john001",
        comment: "Comment 2",
        id: "2",
        fullName: "John Doe",
      },
    ],
  },
  {
    author: { username: "john001", fullName: "John Doe" },
    authorId: "2",
    post: "Lorem ipsum dolor...",
    comments: [],
  },
];

function Posts() {
  return (
    <Layout>
      <>
        <AddPost />
        <div>
          {posts.map((post, i) => (
            <Post
              key={i}
              author={post.author}
              text={post.post}
              date=""
              postId="#"
              comments={post.comments}
            />
          ))}
        </div>
        <FriendsPostsOver />
      </>
    </Layout>
  );
}

export default withProtected(Posts);
