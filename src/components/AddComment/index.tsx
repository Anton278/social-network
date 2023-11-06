import { Button, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

import { Comment } from "@/models/Comment";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updatePost } from "@/redux/slices/posts/thunks";

type AddCommentProps = {
  comments: Comment[];
  postId: string;
};

function AddComment({ comments, postId }: AddCommentProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [isSending, setsIsSending] = useState(false);

  async function onSendClick() {
    setsIsSending(true);

    const lastComment = comments[comments.length - 1];
    const newComment: Comment = {
      comment,
      author: {
        fullName: user.fullName,
        id: user.id,
        username: user.username,
      },
      id: lastComment ? lastComment.id + 1 : 1,
      timestamp: Math.ceil(Date.now() / 1000),
      isEdited: false,
    };

    await dispatch(
      updatePost({ id: postId, comments: [newComment, ...comments] })
    );

    setsIsSending(false);
    setComment("");
  }

  return (
    <>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        label="Add comment"
        sx={{ marginRight: "12px" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        disabled={!comment.trim().length || isSending}
        onClick={onSendClick}
        data-testid="send-btn"
      >
        Send
      </Button>
    </>
  );
}

export default AddComment;
