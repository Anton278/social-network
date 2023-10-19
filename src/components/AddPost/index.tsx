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
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";

import { Post } from "@/models/Post";
import { useAppSelector } from "@/hooks/useAppSelector";
import Spinner from "@/components/Spinner";

import * as Styled from "./AddPost.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addPost } from "@/redux/slices/posts/thunks";

function AddPost() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onPublishClick() {
    setIsSubmitting(true);
    setError("");

    const post: Post = {
      author: {
        fullName: user.fullName,
        id: user.id,
        username: user.username,
      },
      body: text,
      comments: [],
      //@ts-expect-error
      timeStamp: serverTimestamp(),
      isPrivate,
      isEdited: false,
    };

    try {
      await dispatch(addPost(post)).unwrap();
      setText("");
    } catch (e) {
      setError("Failed to add post");
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
          disabled={!text.trim().length || isSubmitting}
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
