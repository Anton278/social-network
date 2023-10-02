import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  TextField,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Comment } from "@/models/Comment";
import { updatePost } from "@/redux/slices/posts/thunks";
import { stringToColor } from "@/utils/stringToColor";

type CommentsDialogProps = {
  open: boolean;
  onClose?: () => void;
  comments: Comment[];
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

  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  async function onSendClick() {
    setsIsSending(true);

    const lastComment = comments[comments.length - 1];
    const newComment: Comment = {
      comment,
      fullName: user.fullName,
      userId: user.userId,
      username: user.username,
      id: lastComment ? lastComment.id + 1 : 1,
    };
    await dispatch(updatePost({ postId, comments: [...comments, newComment] }));

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
            <div key={comment.id}>
              <Link
                href={`/profiles/${comment.userId}`}
                style={{
                  color: "#000",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <Avatar {...stringAvatar(comment.fullName)} />
                <h5>{comment.username}</h5>
              </Link>
              <p>{comment.comment}</p>
            </div>
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
