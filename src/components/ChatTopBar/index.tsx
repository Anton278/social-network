import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteChat } from "@/redux/slices/chats/thunks";
import UserSummary from "../UserSummary";
import { ChatParticipant } from "@/models/ChatParticipant";

import * as Styled from "./ChatTopBar.styled";

type ChatTopBarProps = {
  interlocutor: ChatParticipant;
};

function ChatTopBar({ interlocutor }: ChatTopBarProps) {
  const router = useRouter();
  const chatId = router.query.id;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  async function handleDeleteChat() {
    if (typeof chatId !== "string") {
      return;
    }
    setIsDeleting(true);
    try {
      await dispatch(deleteChat(chatId));
      router.push("/chats");
    } catch (err) {
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Styled.TopBar>
      <Styled.TopBarLeft>
        <IconButton
          onClick={() => router.push("/chats")}
          data-testid="back-btn"
        >
          <ArrowBackIcon />
        </IconButton>
        <UserSummary
          fullName={interlocutor.fullName}
          username={interlocutor.username}
          id={interlocutor.id}
          showActionButtons={false}
        />
      </Styled.TopBarLeft>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        data-testid="more-btn"
      >
        <MoreVertIcon />
      </IconButton>
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
    </Styled.TopBar>
  );
}

export default ChatTopBar;
