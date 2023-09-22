import { stringToColor } from "@/utils/stringToColor";
import Link from "next/link";
import { Avatar } from "@mui/material";

interface PostProps {
  author: string;
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
        <Avatar {...stringAvatar(author)} />
        <h5>{author}</h5>
      </Link>
      <p>{text}</p>
    </div>
  );
}

export default Post;
