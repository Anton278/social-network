import { Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Avatar from "../Avatar";
import { ChatParticipant } from "@/models/ChatParticipant";

import * as Styled from "./ChatSummary.styled";

type ChatSummaryProps = {
  id: string;
  interlocutor?: ChatParticipant;
};

function ChatSummary(props: ChatSummaryProps) {
  const { id, interlocutor } = props;

  return (
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
      <IconButton onClick={(e) => e.preventDefault()}>
        <MoreVertIcon />
      </IconButton>
    </Styled.Link>
  );
}

export default ChatSummary;
