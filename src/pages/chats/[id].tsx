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
import { ChatParticipant } from "@/models/ChatParticipant";
import { selectUserId } from "@/redux/slices/user/selectors";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../_app";
import { setChat } from "@/redux/slices/chats/slice";

function Chat() {
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const chats = useAppSelector((state) => state.chats.chats);
  const chat = chats.find((chat) => chat.id === id);
  const [interlocutor, setInterlocutor] = useState<ChatParticipant>();
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    const unsub = onSnapshot(
      doc(db, "chats", id),
      (doc) => {
        if (doc.metadata.hasPendingWrites) {
          return;
        }
        const chatSnap = { ...doc.data(), id: doc.id } as ChatModel;
        if (Object.keys(chatSnap).length === 1) {
          return;
        }

        chatSnap.messages.sort((a, b) => b.timeStamp - a.timeStamp);
        dispatch(setChat(chatSnap));
      },
      (error) => {
        setError("Failed to get chat");
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <Layout
      layoutWrapperStyles={{ height: "100vh" }}
      mainNodeStyles={{ overflowY: "auto" }}
    >
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : !chat ? (
        <Typography>loading...</Typography>
      ) : (
        <Styled.PageWrapper>
          {interlocutor && <ChatTopBar interlocutor={interlocutor} />}
          {chat && (
            <>
              <ChatMessages messages={chat.messages} />
              <ChatBottomBar
                id={chat.id}
                lastMessageId={chat.messages[0]?.id}
              />
            </>
          )}
        </Styled.PageWrapper>
      )}
    </Layout>
  );
}

export default withProtected(Chat);
