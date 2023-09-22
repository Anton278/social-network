import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import type { Post } from "@/models/Post";
import * as Styled from "@/styles/Posts.styled";
import { stringToColor } from "@/utils/stringToColor";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";

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
      <div>
        {posts.map((post, i) => (
          <div key={i}>
            <Link
              href="#"
              style={{
                color: "#000",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <Avatar {...stringAvatar(post.author)} />
              <h5>{post.author}</h5>
            </Link>
            <p>{post.post}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default withProtected(Posts);
