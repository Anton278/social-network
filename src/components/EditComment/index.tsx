import { Button, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Comment } from "@/models/Comment";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updatePost } from "@/redux/slices/posts/thunks";

type EditCommentProps = {
  onCancel?: () => void;
  comment: string;
  commentId: number;
  comments: Comment[];
  postId: string;
  onUpdated?: () => void;
};

function EditComment({
  onCancel,
  comment,
  commentId,
  comments,
  postId,
  onUpdated,
}: EditCommentProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(comment);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdateComment() {
    setIsUpdating(true);

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, comment: value, isEdited: true }
        : comment
    );

    await dispatch(updatePost({ id: postId, comments: updatedComments }));
    onUpdated && onUpdated();
    setIsUpdating(false);
  }

  return (
    <>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        label="Edit"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>
        <Button
          variant="text"
          endIcon={<CloseIcon />}
          onClick={onCancel}
          sx={{ marginRight: "20px" }}
          data-testid="cancel-btn"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<SaveIcon />}
          disabled={!value.trim().length || isUpdating || comment === value}
          onClick={handleUpdateComment}
          data-testid="save-btn"
        >
          Save
        </Button>
      </p>
    </>
  );
}

export default EditComment;
