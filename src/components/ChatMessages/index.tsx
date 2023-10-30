import { Message } from "@/models/Chat";
import { Typography } from "@mui/material";
import * as Styled from "./ChatMessages.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";
import { getTime } from "@/utils/getTime";

type ChatMessagesProps = {
  messages: Message[];
};

function ChatMessages({ messages }: ChatMessagesProps) {
  const userId = useAppSelector(selectUserId);

  return (
    <Styled.MessagesList>
      {messages.length ? (
        messages.toReversed().map((message) => {
          const sentAt = getTime(message.timeStamp);
          return (
            <Styled.Message
              isUserMessage={message.authorId === userId}
              key={message.id}
            >
              <Typography style={{ margin: 0 }}>{message.message}</Typography>
              <Styled.SentAt>({sentAt})</Styled.SentAt>
            </Styled.Message>
          );
        })
      ) : (
        <Styled.NoMessages>No messages yet</Styled.NoMessages>
      )}
    </Styled.MessagesList>
  );
}

export default ChatMessages;
