import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Comment as CommentModel } from "@/models/Comment";
import { updatePost } from "@/redux/slices/posts/thunks";
import Comment from "../Comment";

type CommentsDialogProps = {
  open: boolean;
  onClose?: () => void;
  comments: CommentModel[];
  postId: string;
};

function CommentsDialog({
  open,
  onClose = () => {},
  comments,
  postId,
}: CommentsDialogProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [isSending, setsIsSending] = useState(false);

  async function onSendClick() {
    setsIsSending(true);

    const lastComment = comments[comments.length - 1];
    const newComment: CommentModel = {
      comment,
      author: {
        fullName: user.fullName,
        id: user.id,
        username: user.username,
      },
      id: lastComment ? lastComment.id + 1 : 1,
      timestamp: Math.ceil(Date.now() / 1000),
    };

    await dispatch(
      updatePost({ id: postId, comments: [...comments, newComment] })
    );

    setsIsSending(false);
    setComment("");
  }

  return (
    <Dialog
      open={open}
      scroll="paper"
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Comments</DialogTitle>
      <DialogContent dividers>
        {comments.length ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              timestamp={comment.timestamp}
              comment={comment.comment}
              postId={postId}
              id={comment.id}
            />
          ))
        ) : (
          <Typography>
            No comments yet. Be the first person who left comment here!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
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
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentsDialog;
