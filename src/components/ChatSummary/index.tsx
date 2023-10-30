import {
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import Avatar from "../Avatar";
import { ChatParticipant } from "@/models/ChatParticipant";
import { deleteChat } from "@/redux/slices/chats/thunks";
import { updateUser } from "@/redux/slices/user/thunks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { db } from "@/pages/_app";

import * as Styled from "./ChatSummary.styled";

type ChatSummaryProps = {
  id: string;
  interlocutor: ChatParticipant;
  lastMessage: string;
};

function ChatSummary(props: ChatSummaryProps) {
  const { id, interlocutor, lastMessage } = props;

  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  async function handleDeleteChat() {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      await dispatch(deleteChat(id)).unwrap();
    } catch (e) {
      return setIsDeleting(false);
    }
    try {
      const updatedChats = chats.filter((chat) => chat !== id);
      await dispatch(updateUser({ chats: updatedChats })).unwrap();
      const interlocutorDocRef = doc(db, "users", interlocutor.id);
      await updateDoc(interlocutorDocRef, {
        chats: arrayRemove(id),
      });
    } catch (e) {
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Styled.Wrapper>
      <Styled.Link href={`/chats/${id}`}>
        <Styled.ChatSummary>
          <Avatar fullName={interlocutor?.fullName} />
          <div style={{ flexGrow: "1" }}>
            <Typography component="h5" sx={{ fontWeight: "bold" }}>
              {interlocutor?.fullName}
            </Typography>
            <Styled.LastMessage>{lastMessage}</Styled.LastMessage>
          </div>
        </Styled.ChatSummary>
      </Styled.Link>
      <Styled.MoreButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </Styled.MoreButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDeleteChat}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Styled.Wrapper>
  );
}

export default ChatSummary;
