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

import Avatar from "../Avatar";
import { ChatParticipant } from "@/models/ChatParticipant";

import * as Styled from "./ChatSummary.styled";

type ChatSummaryProps = {
  id: string;
  interlocutor?: ChatParticipant;
};

function ChatSummary(props: ChatSummaryProps) {
  const { id, interlocutor } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <Styled.Wrapper>
      <Styled.Link href={`/chats/${id}`}>
        <Styled.ChatSummary>
          <Avatar fullName={interlocutor?.fullName} />
          <div>
            <Typography component="h5" sx={{ fontWeight: "bold" }}>
              {interlocutor?.fullName}
            </Typography>
            <p>Last message</p>
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
        <MenuItem>
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
