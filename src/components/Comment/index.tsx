import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

import { stringToColor } from "@/utils/stringToColor";
import { getTimeFromNow } from "@/utils/getTimeFromNow";
import MoreMenu from "../MoreMenu";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";
import { Comment as CommentModel } from "@/models/Comment";

import * as Styled from "./Comment.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteComment } from "@/redux/slices/posts/thunks";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

type CommentProps = {
  postId: string;
  onEditClick: (comment: CommentModel) => void;
  comment: CommentModel;
};

function Comment(props: CommentProps) {
  const { comment, postId, onEditClick } = props;

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { isMobile } = useWindowDimensions();

  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const timeFromNow = getTimeFromNow(comment.timestamp);

  function handleDelete() {
    dispatch(deleteComment({ postId, commentId: comment.id }));
  }

  return (
    <div>
      <Styled.TopLine>
        <Styled.Author href={`/profiles/${comment.author.id}`}>
          <Avatar {...stringAvatar(comment.author.fullName)} />
          <h5>{comment.author.username}</h5>
        </Styled.Author>
        {!isMobile && (
          <>
            <span>·</span>
            <span>{timeFromNow}</span>
            {comment.isEdited && (
              <>
                <span>·</span>
                <Styled.Marker>(Edited)</Styled.Marker>
              </>
            )}
          </>
        )}
        {comment.author.id === userId && (
          <>
            <IconButton
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
              data-testid="more-btn"
            >
              <MoreVertIcon />
            </IconButton>
            <MoreMenu
              anchorEl={menuAnchorEl}
              onClose={() => setMenuAnchorEl(null)}
              onDeleteClick={handleDelete}
              onEditClick={() => onEditClick(comment)}
            />
          </>
        )}
      </Styled.TopLine>
      <p>{comment.comment}</p>
      {isMobile && (
        <Styled.TimeAndEdited>
          <span>{timeFromNow}</span>
          {comment.isEdited && (
            <>
              <span>·</span>
              <Styled.Marker>Edited</Styled.Marker>
            </>
          )}
        </Styled.TimeAndEdited>
      )}
    </div>
  );
}

export default Comment;
