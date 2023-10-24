import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import * as Styled from "./ChatBottomBar.styled";

function ChatBottomBar() {
  return (
    <Styled.BottomBar>
      <Styled.Input
        label="Send message"
        variant="outlined"
        fullWidth
        multiline
        maxRows={4}
      />
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Styled.BottomBar>
  );
}

export default ChatBottomBar;
