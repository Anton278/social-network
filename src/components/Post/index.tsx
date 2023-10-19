import Link from "next/link";
import { Avatar, Button, IconButton } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { stringToColor } from "@/utils/stringToColor";
import CommentsDialog from "../CommentsDialog";
import { Comment } from "@/models/Comment";
import { getTimeFromNow } from "@/utils/getTimeFromNow";

import * as Styled from "./Post.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";
import EditPost from "../EditPost";
import MoreMenu from "../MoreMenu";
import ConfirmDelete from "../ConfirmDelete";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deletePost } from "@/redux/slices/posts/thunks";

interface PostProps {
  author: { username: string; fullName: string; id: string };
  date: number;
  text: string;
  comments: Comment[];
  isPrivate: boolean;
  postId: string;
  isEdited: boolean;
}

function Post(props: PostProps) {
  const { author, text, postId, comments, date, isPrivate, isEdited } = props;

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDel, setShowConfirmDel] = useState(false);

  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  async function handleDeletePost() {
    await dispatch(deletePost(postId)).unwrap();
  }

  const postDateFromNow = getTimeFromNow(date);

  const splittedText = text.split(" ");
  const shouldTruncateText = splittedText.length >= 100;

  return (
    <>
      <div data-testid="post">
        <Styled.TopBar>
          <Link
            href={`/profiles/${author.id}`}
            style={{
              color: "#000",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
            }}
          >
            <Avatar {...stringAvatar(author.fullName)} />
            <h5>{author.username}</h5>
          </Link>
          <span>·</span>
          <span>{postDateFromNow}</span>
          {isPrivate && (
            <>
              <span>·</span>
              <Styled.Marker>(Private)</Styled.Marker>
            </>
          )}
          {isEdited && (
            <>
              <span>·</span>
              <Styled.Marker>(Edited)</Styled.Marker>
            </>
          )}
          {author.id === userId && (
            <>
              <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <MoreMenu
                anchorEl={menuAnchorEl}
                onClose={() => setMenuAnchorEl(null)}
                onEditClick={() => {
                  setShowEditModal(true);
                }}
                onDeleteClick={() => {
                  setShowConfirmDel(true);
                }}
              />
            </>
          )}
        </Styled.TopBar>
        <Styled.PostBody>
          {shouldTruncateText
            ? showFullText
              ? text
              : splittedText.slice(0, 100).join(" ")
            : text}{" "}
          {shouldTruncateText && !showFullText && (
            <Styled.ToggleFullTxtBtn
              onClick={() => {
                setShowFullText(true);
              }}
            >
              ...more
            </Styled.ToggleFullTxtBtn>
          )}
        </Styled.PostBody>
        {shouldTruncateText && showFullText && (
          <Styled.ToggleFullTxtBtn
            onClick={() => {
              setShowFullText(false);
            }}
            style={{ marginTop: "5px" }}
          >
            Show less
          </Styled.ToggleFullTxtBtn>
        )}
        <Styled.CommentsBtnWrapper>
          <Button variant="outlined" onClick={() => setShowDialog(true)}>
            {comments.length ? (
              <span style={{ marginRight: "4px" }}>{comments.length}</span>
            ) : null}
            Comments
          </Button>
        </Styled.CommentsBtnWrapper>
      </div>
      <CommentsDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        comments={comments}
        postId={postId}
      />
      <EditPost
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        originalText={text}
        postId={postId}
      />
      <ConfirmDelete
        open={showConfirmDel}
        onClose={() => setShowConfirmDel(false)}
        onConfirm={handleDeletePost}
      />
    </>
  );
}

export default Post;
