import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

import { Comment as CommentModel } from "@/models/Comment";
import Comment from "../Comment";
import AddComment from "../AddComment";
import EditComment from "../EditComment";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState<CommentModel | null>(
    null
  );

  function handleCancelEditing() {
    setIsEditing(false);
    setEditingComment(null);
  }

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
              comment={comment}
              key={comment.id}
              postId={postId}
              onEditClick={(comment) => {
                setIsEditing(true);
                setEditingComment(comment);
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
        {isEditing && editingComment !== null ? (
          <EditComment
            comment={editingComment.comment}
            commentId={editingComment.id}
            comments={comments}
            postId={postId}
            onCancel={handleCancelEditing}
            onUpdated={handleCancelEditing}
          />
        ) : (
          <AddComment comments={comments} postId={postId} />
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CommentsDialog;
