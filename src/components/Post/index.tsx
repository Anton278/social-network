import Link from "next/link";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";

import { stringToColor } from "@/utils/stringToColor";
import CommentsDialog from "../CommentsDialog";
import { Comment } from "@/models/Comment";
import { getTimeFromNow } from "@/utils/getTimeFromNow";

import * as Styled from "./Post.styled";

interface PostProps {
  author: { username: string; fullName: string; id: string };
  date: number;
  text: string;
  comments: Comment[];
  isPrivate: boolean;
  postId: string;
}

function Post(props: PostProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const { author, text, postId, comments, date, isPrivate } = props;

  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const postDateFromNow = getTimeFromNow(date);

  const splittedText = text.split(" ");
  const shouldTruncateText = splittedText.length >= 100;

  return (
    <>
      <div data-testid="post">
        <Styled.TopBar>
          <Link
            href={`/profiles/${author.id}`}
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
          <span>{postDateFromNow}</span>
          {isPrivate && (
            <>
              <span>·</span>
              <Styled.PrivateMarker>(Private)</Styled.PrivateMarker>
            </>
          )}
        </Styled.TopBar>
        <Styled.PostBody>
          {shouldTruncateText
            ? showFullText
              ? text
              : splittedText.slice(0, 100).join(" ")
            : text}{" "}
          {shouldTruncateText && !showFullText && (
            <Styled.ToggleFullTxtBtn
              onClick={() => {
                setShowFullText(true);
              }}
            >
              ...more
            </Styled.ToggleFullTxtBtn>
          )}
        </Styled.PostBody>
        {shouldTruncateText && showFullText && (
          <Styled.ToggleFullTxtBtn
            onClick={() => {
              setShowFullText(false);
            }}
            style={{ marginTop: "5px" }}
          >
            Show less
          </Styled.ToggleFullTxtBtn>
        )}
        <Styled.CommentsBtnWrapper>
          <Button variant="outlined" onClick={() => setShowDialog(true)}>
            {comments.length ? (
              <span style={{ marginRight: "4px" }}>{comments.length}</span>
            ) : null}
            Comments
          </Button>
        </Styled.CommentsBtnWrapper>
      </div>
      <CommentsDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        comments={comments}
        postId={postId}
      />
    </>
  );
}

export default Post;
