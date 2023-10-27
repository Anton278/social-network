import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

import * as Styled from "./ChatBottomBar.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addMessage } from "@/redux/slices/chats/thunks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";

type ChatBottomBarProps = {
  id: string;
  lastMessageId: number | undefined;
};

function ChatBottomBar({ id, lastMessageId }: ChatBottomBarProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSendClick() {
    setIsLoading(true);
    try {
      const message = {
        authorId: userId,
        message: value,
        timeStamp: Date.now() / 1000,
        isEdited: false,
        id: lastMessageId ? lastMessageId + 1 : 1,
      };
      await dispatch(addMessage({ id, message }));
      setValue("");
      setIsLoading(false);
    } catch (e) {}
  }

  return (
    <Styled.BottomBar>
      <Styled.Input
        label="Send message"
        variant="outlined"
        fullWidth
        multiline
        maxRows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onSendClick}
        disabled={isLoading || !value.trim().length}
      >
        Send
      </Button>
    </Styled.BottomBar>
  );
}

export default ChatBottomBar;
