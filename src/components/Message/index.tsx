import * as Styled from "./Message.styled";
import { Typography } from "@mui/material";

type MessageProps = {
  isUserMessage: boolean;
  body: string;
  sentAt: string;
};

function Message(props: MessageProps) {
  const { isUserMessage, body, sentAt } = props;

  return (
    <Styled.Message isUserMessage={isUserMessage}>
      <Typography style={{ margin: 0 }}>{body}</Typography>
      <Styled.SentAt>({sentAt})</Styled.SentAt>
    </Styled.Message>
  );
}

export default Message;
