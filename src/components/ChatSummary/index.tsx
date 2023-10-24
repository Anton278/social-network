import { Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Avatar from "../Avatar";

import * as Styled from "./ChatSummary.styled";

function ChatSummary() {
  return (
    <Styled.Link href={"/chats/1"}>
      <Styled.ChatSummary>
        <Avatar fullName="John Doe" />
        <div>
          <Typography component="h5" sx={{ fontWeight: "bold" }}>
            John Doe
          </Typography>
          <p>Last message</p>
        </div>
      </Styled.ChatSummary>
      <IconButton onClick={(e) => e.preventDefault()}>
        <MoreVertIcon />
      </IconButton>
    </Styled.Link>
  );
}

export default ChatSummary;
