import { stringToColor } from "@/utils/stringToColor";
import Link from "next/link";
import { Avatar, Button } from "@mui/material";
import * as Styled from "./Post.styled";

interface PostProps {
  author: { username: string; fullName: string };
  date: string;
  text: string;
}

function Post(props: PostProps) {
  const { author, text } = props;

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
    <div>
      <Styled.TopBar>
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
          <Avatar {...stringAvatar(author.fullName)} />
          <h5>{author.username}</h5>
        </Link>
        <span>·</span>
        <span>1 minute ago</span>
      </Styled.TopBar>
      <p>{text}</p>
      <Button variant="outlined">
        <span style={{ marginRight: "4px" }}>3</span>
        Comments
      </Button>
    </div>
  );
}

export default Post;
