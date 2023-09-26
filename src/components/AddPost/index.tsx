import * as Styled from "./AddPost.styled";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserId } from "@/redux/slices/auth/selectors";
import { useState } from "react";
import Spinner from "@/components/Spinner";

function AddPost() {
  const { db } = useFirebaseDB();
  const userId = useSelector(selectUserId);
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onPublishClick() {
    setIsSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "posts"), {
        userId,
        text,
        isPrivate,
      });

      setText("");
    } catch (e) {
      setError("Failed to publish post");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <TextField
        label="What you want to tell?"
        multiline
        maxRows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Styled.BottomRow>
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
          onClick={onPublishClick}
          disabled={!text.trim().length}
          endIcon={isSubmitting ? <Spinner /> : <SendIcon />}
        >
          Publish
        </Button>
      </Styled.BottomRow>
      {error && (
        <Typography
          color="error"
          sx={{ textAlign: "center", marginTop: "5px" }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

export default AddPost;
