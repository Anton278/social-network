import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
// import type { Post } from "@/models/Post";
import * as Styled from "@/styles/Posts.styled";
import { stringToColor } from "@/utils/stringToColor";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import Post from "@/components/Post";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const posts = [
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
  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Layout>
      <>
        <div>
          {posts.map((post, i) => (
            <Post key={i} author={post.author} text={post.post} />
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
