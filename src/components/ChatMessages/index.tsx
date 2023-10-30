import { Message } from "@/models/Chat";
import * as Styled from "./ChatMessages.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";

type ChatMessagesProps = {
  messages: Message[];
};

function ChatMessages({ messages }: ChatMessagesProps) {
  const userId = useAppSelector(selectUserId);

  return (
    <Styled.MessagesList>
      {messages.length ? (
        messages.toReversed().map((message) => (
          <Styled.Message
            isUserMessage={message.authorId === userId}
            key={message.id}
          >
            {message.message}
          </Styled.Message>
        ))
      ) : (
        <Styled.NoMessages>No messages yet</Styled.NoMessages>
      )}
    </Styled.MessagesList>
  );
}

export default ChatMessages;
