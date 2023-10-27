import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";

import UserSummary from "../UserSummary";

import * as Styled from "./ChatTopBar.styled";
import { ChatParticipant } from "@/models/ChatParticipant";

type ChatTopBarProps = {
  interlocutor: ChatParticipant;
};

function ChatTopBar({ interlocutor }: ChatTopBarProps) {
  const router = useRouter();

  return (
    <Styled.TopBar>
      <Styled.TopBarLeft>
        <IconButton onClick={() => router.push("/chats")}>
          <ArrowBackIcon />
        </IconButton>
        <UserSummary
          fullName={interlocutor.fullName}
          username={interlocutor.username}
          id={interlocutor.id}
          showActionButtons={false}
        />
      </Styled.TopBarLeft>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Styled.TopBar>
  );
}

export default ChatTopBar;
