import { Comment } from "@/models/Comment";
import { stringToColor } from "@/utils/stringToColor";
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

type CommentsDialogProps = {
  open?: boolean;
  onClose?: () => void;
  comments: Comment[];
};

function CommentsDialog({
  open = false,
  onClose = () => {},
  comments,
}: CommentsDialogProps) {
  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
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
        />
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentsDialog;
