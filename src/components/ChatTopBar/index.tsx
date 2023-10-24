import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import UserSummary from "../UserSummary";

import * as Styled from "./ChatTopBar.styled";

function ChatTopBar() {
  return (
    <Styled.TopBar>
      <Styled.TopBarLeft>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <UserSummary
          fullName="John Doe"
          username="john001"
          id="1"
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
