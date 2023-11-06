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

import { useAppDispatch } from "@/hooks/useAppDispatch";
import Avatar from "../Avatar";
import { ChatParticipant } from "@/models/ChatParticipant";
import { deleteChat } from "@/redux/slices/chats/thunks";

import * as Styled from "./ChatSummary.styled";

type ChatSummaryProps = {
  id: string;
  interlocutor: ChatParticipant;
  lastMessage: string;
};

function ChatSummary(props: ChatSummaryProps) {
  const { id, interlocutor, lastMessage } = props;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  async function handleDeleteChat() {
    setIsDeleting(true);
    try {
      await dispatch(deleteChat(id));
    } catch (err) {
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
      <Styled.MoreButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        data-testid="more-menu-btn"
      >
        <MoreVertIcon />
      </Styled.MoreButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={handleDeleteChat}
          data-testid="delete-btn"
          disabled={isDeleting}
        >
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
