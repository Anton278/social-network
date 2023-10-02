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
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";

import { Post } from "@/models/Post";
import { useAppSelector } from "@/hooks/useAppSelector";
import { PostWithId } from "@/models/PostWithId";
import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import Spinner from "@/components/Spinner";

import * as Styled from "./AddPost.styled";

type AddPostProps = {
  onAddedPost?: (post: PostWithId) => void;
};

function AddPost({ onAddedPost }: AddPostProps) {
  const { db } = useFirebaseDB();
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
        userId: user.userId,
        username: user.username,
      },
      body: text,
      comments: [],
      //@ts-expect-error
      timeStamp: serverTimestamp(),
      isPrivate,
    };

    try {
      const postDocRef = await addDoc(collection(db, "posts"), post);

      if (typeof onAddedPost === "function") {
        onAddedPost({
          ...post,
          timeStamp: {
            seconds: Date.now() / 1000,
            nanoseconds: 0,
          } as Timestamp,
          id: postDocRef.id,
        });
      }

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
