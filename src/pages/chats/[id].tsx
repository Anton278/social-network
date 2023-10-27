import Layout from "@/components/Layout";
import { withProtected } from "@/hocs/withProtected";
import ChatTopBar from "@/components/ChatTopBar";
import ChatMessages from "@/components/ChatMessages";
import ChatBottomBar from "@/components/ChatBottomBar";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import * as Styled from "@/styles/Chat.styled";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Chat as ChatModel } from "@/models/Chat";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getChats } from "@/redux/slices/chats/thunks";
import { RequestStatus } from "@/models/RequestStatus";
import { ChatParticipant } from "@/models/ChatParticipant";
import { selectUserId } from "@/redux/slices/user/selectors";
import { sortMessages } from "@/utils/sortMessages";

function Chat() {
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const chats = useAppSelector((state) => state.chats.chats);
  const [chat, setChat] = useState<ChatModel>();
  const chatsStatus = useAppSelector((state) => state.chats.status);
  const [interlocutor, setInterlocutor] = useState<ChatParticipant>();

  useEffect(() => {
    function getChat() {
      const chat = chats.find((chat) => chat.id === id);
      if (chat) {
        const chatWithSortedMessages = sortMessages(chat);
        setChat(chatWithSortedMessages);
      } else {
        dispatch(getChats());
      }
    }

    getChat();
  }, [id, chats]);

  useEffect(() => {
    function getInterlocutor() {
      if (chat === undefined) {
        return;
      }
      const interlocutor = chat.participants.find(
        (participant) => participant.id !== userId
      );
      if (interlocutor) {
        setInterlocutor(interlocutor);
      }
    }

    getInterlocutor();
  }, [chat]);

  return (
    <Layout
      layoutWrapperStyles={{ height: "100vh" }}
      mainNodeStyles={{ overflowY: "auto" }}
    >
      {chatsStatus === RequestStatus.Error ? (
        <Typography color={"error"}>Failed to load chat</Typography>
      ) : chatsStatus === RequestStatus.Loading ? (
        <Typography>loading...</Typography>
      ) : (
        <Styled.PageWrapper>
          {interlocutor && <ChatTopBar interlocutor={interlocutor} />}
          {chat && (
            <>
              <ChatMessages messages={chat.messages} />
              <ChatBottomBar
                id={chat.id}
                lastMessageId={chat.messages[chat.messages.length - 1]?.id}
              />
            </>
          )}
        </Styled.PageWrapper>
      )}
    </Layout>
  );
}

export default withProtected(Chat);
