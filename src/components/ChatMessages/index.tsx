import { Message } from "@/models/Chat";
import { Typography } from "@mui/material";
import * as Styled from "./ChatMessages.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";
import { getTime } from "@/utils/getTime";
import { getDay } from "@/utils/getDay";
import { Fragment } from "react";

type ChatMessagesProps = {
  messages: Message[];
};

function ChatMessages({ messages }: ChatMessagesProps) {
  const userId = useAppSelector(selectUserId);
  const groupedMessages = messages.reduce<{ [key: string]: Message[] }>(
    (acc, message) => {
      const day = getDay(message.timeStamp * 1000);
      if (day in acc) {
        return { ...acc, [day]: [...acc[day], message] };
      } else {
        return { ...acc, [day]: [message] };
      }
    },
    {}
  );
  const groupedMessagesEntries = Object.entries(groupedMessages);

  if (!groupedMessagesEntries.length) {
    return (
      <Styled.MessagesList>
        <Styled.NoMessages>No messages yet</Styled.NoMessages>
      </Styled.MessagesList>
    );
  }

  return (
    <Styled.MessagesList>
      {groupedMessagesEntries.map(([day, messages]) => (
        <Fragment key={day}>
          <Styled.DayDivider>
            <Typography>{day}</Typography>
          </Styled.DayDivider>
          {messages.toReversed().map((message) => {
            const sentAt = getTime(message.timeStamp * 1000);
            return (
              <Styled.Message
                isUserMessage={message.authorId === userId}
                key={message.id}
              >
                <Typography style={{ margin: 0 }}>{message.message}</Typography>
                <Styled.SentAt>({sentAt})</Styled.SentAt>
              </Styled.Message>
            );
          })}
        </Fragment>
      ))}
    </Styled.MessagesList>
  );
}

export default ChatMessages;
