import { Message as MessageModel } from "@/models/Chat";
import { Typography } from "@mui/material";
import * as Styled from "./ChatMessages.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";
import { getTime } from "@/utils/getTime";
import { getDay } from "@/utils/getDay";
import { Fragment } from "react";
import Message from "../Message";

type ChatMessagesProps = {
  messages: MessageModel[];
};

function ChatMessages({ messages }: ChatMessagesProps) {
  const userId = useAppSelector(selectUserId);

  const groupedMessages = messages.reduce((acc, message) => {
    const day = getDay(message.timeStamp * 1000);
    const groupIndex = acc.findIndex((group) => group[0] === day);
    if (groupIndex >= 0) {
      acc[groupIndex][1].push(message);
      return acc;
    } else {
      acc.unshift([day, [message]]);
      return acc;
    }
  }, [] as [day: string, messages: MessageModel[]][]);

  if (!groupedMessages.length) {
    return (
      <Styled.MessagesList>
        <Styled.NoMessages>No messages yet</Styled.NoMessages>
      </Styled.MessagesList>
    );
  }

  return (
    <Styled.MessagesList>
      {groupedMessages.map(([day, messages]) => (
        <Fragment key={day}>
          <Styled.DayDivider>
            <Typography>{day}</Typography>
          </Styled.DayDivider>
          {messages.toReversed().map((message) => {
            const sentAt = getTime(message.timeStamp);
            return (
              <Message
                isUserMessage={message.authorId === userId}
                body={message.message}
                sentAt={sentAt}
                key={message.id}
              />
            );
          })}
        </Fragment>
      ))}
    </Styled.MessagesList>
  );
}

export default ChatMessages;
