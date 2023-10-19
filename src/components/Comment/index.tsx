import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

import { stringToColor } from "@/utils/stringToColor";
import { getTimeFromNow } from "@/utils/getTimeFromNow";
import MoreMenu from "../MoreMenu";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";

import * as Styled from "./Comment.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteComment } from "@/redux/slices/posts/thunks";

type CommentProps = {
  author: {
    fullName: string;
    username: string;
    id: string;
  };
  timestamp: number;
  comment: string;
  postId: string;
  id: number;
  onEditClick: (id: number) => void;
};

function Comment(props: CommentProps) {
  const { author, timestamp, comment, postId, id, onEditClick } = props;

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  function stringAvatar(name: string) {
    return {
      sx: {
        marginRight: "5px",
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const timeFromNow = getTimeFromNow(timestamp);

  function handleDelete() {
    dispatch(deleteComment({ postId, commentId: id }));
  }

  return (
    <div>
      <Styled.TopLine>
        <Styled.Author href={`/profiles/${author.id}`}>
          <Avatar {...stringAvatar(author.fullName)} />
          <h5>{author.username}</h5>
        </Styled.Author>
        <span>·</span>
        <span>{timeFromNow}</span>
        {author.id === userId && (
          <>
            <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
            <MoreMenu
              anchorEl={menuAnchorEl}
              onClose={() => setMenuAnchorEl(null)}
              onDeleteClick={handleDelete}
              onEditClick={() => onEditClick(id)}
            />
          </>
        )}
      </Styled.TopLine>
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
