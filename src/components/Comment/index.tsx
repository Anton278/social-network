import { Avatar } from "@mui/material";

import { stringToColor } from "@/utils/stringToColor";

import * as Styled from "./Comment.styled";
import { getTimeFromNow } from "@/utils/getTimeFromNow";

type CommentProps = {
  author: {
    fullName: string;
    username: string;
    id: string;
  };
  timestamp: number;
  comment: string;
};

function Comment(props: CommentProps) {
  const { author, timestamp, comment } = props;

  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const timeFromNow = getTimeFromNow(timestamp);

  return (
    <div>
      <Styled.TopLine>
        <Styled.Author href={`/profiles/${author.id}`}>
          <Avatar {...stringAvatar(author.fullName)} />
          <h5>{author.username}</h5>
        </Styled.Author>
        <span>·</span>
        <span>{timeFromNow}</span>
      </Styled.TopLine>
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
