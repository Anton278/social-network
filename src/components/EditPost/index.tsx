import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/Save";

import Spinner from "../Spinner";

import * as Styled from "./EditPost.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updatePost } from "@/redux/slices/posts/thunks";

type EditPostProps = {
  open: boolean;
  onClose?: () => void;
  originalText?: string;
  originalIsPrivate: boolean;
  postId: string;
};

function EditPost(props: EditPostProps) {
  const {
    open,
    onClose = () => {},
    originalText = "",
    postId,
    originalIsPrivate,
  } = props;

  const dispatch = useAppDispatch();
  const [text, setText] = useState(originalText);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isNotEdited = originalText === text && isPrivate === originalIsPrivate;

  async function onSaveClick() {
    setHasError(false);
    setIsSubmitting(true);
    try {
      await dispatch(
        updatePost({ id: postId, body: text, isPrivate, isEdited: true })
      ).unwrap();
      onClose();
    } catch (e) {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!open) {
      setText(originalText);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      scroll="paper"
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Edit post"
          multiline
          maxRows={8}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Styled.CheckboxWrapper>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
            }
            label="Only for friends"
          />
          <Tooltip title="Only your friends will see this post" placement="top">
            <InfoOutlinedIcon />
          </Tooltip>
        </Styled.CheckboxWrapper>
        <Button
          variant="contained"
          onClick={onSaveClick}
          disabled={!text.trim().length || isSubmitting || isNotEdited}
          endIcon={isSubmitting ? <Spinner /> : <SaveIcon />}
          data-testid="save-btn"
        >
          Save
        </Button>
      </DialogActions>
      {hasError && (
        <Typography
          color="error"
          sx={{ textAlign: "center", marginBottom: "10px" }}
        >
          Failed to update
        </Typography>
      )}
    </Dialog>
  );
}

export default EditPost;
