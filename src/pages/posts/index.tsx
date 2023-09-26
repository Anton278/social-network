import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
        <div>
          {posts.map((post, i) => (
            <Post key={i} author={post.author} text={post.post} date="" />
          ))}
        </div>
        <Tooltip title="Add post" placement="left">
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: "20px", right: "20px" }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </>
    </Layout>
  );
}

export default withProtected(Posts);
