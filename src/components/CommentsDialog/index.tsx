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
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

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
  const [isEditing, setIsEditing] = useState(false);
  const [origComment, setOrigComment] = useState("");
  const [editingComment, setEditingComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(-1);
  const [isUpdating, setIsUpdating] = useState(false);

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

  function handleCancelEditing() {
    setIsEditing(false);
    setEditingCommentId(-1);
  }

  async function handleUpdateComment() {
    setIsUpdating(true);

    const updatedComments = comments.map((comment) =>
      comment.id === editingCommentId
        ? { ...comment, comment: editingComment }
        : comment
    );

    await dispatch(updatePost({ id: postId, comments: updatedComments }));

    setIsEditing(false);
    setOrigComment("");
    setEditingComment("");
    setEditingCommentId(-1);

    setIsUpdating(false);
  }

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    const comment = comments.find((comment) => comment.id === editingCommentId);
    if (!comment) {
      return;
    }
    setOrigComment(comment.comment);
    setEditingComment(comment.comment);
  }, [isEditing, editingCommentId]);

  return (
    <Dialog
      open={open}
      scroll="paper"
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEditing ? "Comments · (Editing)" : "Comments"}
      </DialogTitle>
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
              onEditClick={(id: number) => {
                setIsEditing(true);
                setEditingCommentId(id);
              }}
            />
          ))
        ) : (
          <Typography>
            No comments yet. Be the first person who left comment here!
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: isEditing ? "column" : "row",
          alignItems: isEditing ? "flex-end" : "center",
        }}
      >
        {isEditing ? (
          <>
            <TextField
              multiline
              maxRows={4}
              fullWidth
              label={isEditing ? "Edit" : "Add comment"}
              value={editingComment}
              onChange={(e) => setEditingComment(e.target.value)}
            />
            <p>
              <Button
                variant="text"
                endIcon={<CloseIcon />}
                onClick={handleCancelEditing}
                sx={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                disabled={
                  !editingComment.trim().length ||
                  isUpdating ||
                  origComment === editingComment
                }
                onClick={handleUpdateComment}
              >
                Save
              </Button>
            </p>
          </>
        ) : (
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
            >
              Send
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CommentsDialog;
