import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { useState } from "react";

import Spinner from "../Spinner";

type ConfirmDeleteProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: (() => Promise<void>) | (() => void);
};

function ConfirmDelete(props: ConfirmDeleteProps) {
  const { open, onClose = () => {}, onConfirm } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleDelete() {
    if (typeof onConfirm !== "function") {
      return;
    }

    setHasError(false);
    setIsLoading(true);

    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm delete post</DialogTitle>
      <DialogActions>
        <Button variant="text" sx={{ mr: "20px" }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={isLoading ? <Spinner /> : null}
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </Button>
      </DialogActions>
      {hasError && (
        <Typography sx={{ textAlign: "center", my: "10px" }} color="error">
          Failed to delete
        </Typography>
      )}
    </Dialog>
  );
}

export default ConfirmDelete;
