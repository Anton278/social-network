import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ChatSummary from "@/components/ChatSummary";
import { withProtected } from "@/hocs/withProtected";
import FriendsDialog from "@/components/FriendsDialog";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getChats } from "@/redux/slices/chats/thunks";
import { RequestStatus } from "@/models/RequestStatus";
import { selectUserId } from "@/redux/slices/user/selectors";

import * as Styled from "@/styles/Chats.styled";

function Chats() {
  const dispatch = useAppDispatch();

  const [showFriends, setShowFriends] = useState(false);
  const userStatus = useAppSelector((state) => state.user.status);
  const userId = useAppSelector(selectUserId);
  const friends = useAppSelector((state) => state.user.friends);
  const chats = useAppSelector((state) => state.chats.chats);
  const chatsStatus = useAppSelector((state) => state.chats.status);

  useEffect(() => {
    if (userStatus === RequestStatus.IDLE) {
      dispatch(getChats());
    }
  }, [userStatus]);

  if (
    userStatus === RequestStatus.Error ||
    chatsStatus === RequestStatus.Error
  ) {
    return (
      <Layout>
        <Styled.TopBar>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowFriends(true)}
          >
            New chat
          </Button>
        </Styled.TopBar>
        <Typography color={"error"}>Failed to load chats</Typography>
      </Layout>
    );
  }
  if (
    chatsStatus === RequestStatus.Loading ||
    userStatus === RequestStatus.Loading
  ) {
    return (
      <Layout>
        <Styled.TopBar>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowFriends(true)}
          >
            New chat
          </Button>
        </Styled.TopBar>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Styled.TopBar>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowFriends(true)}
          >
            New chat
          </Button>
        </Styled.TopBar>
        {chats.length ? (
          <Styled.ChatsList>
            {chats.map((chat) => {
              const interlocutor = chat.participants.find(
                (participants) => participants.id !== userId
              );
              if (!interlocutor) {
                return;
              }
              return (
                <li key={chat.id}>
                  <ChatSummary
                    id={chat.id}
                    interlocutor={interlocutor}
                    lastMessage={chat.lastMessage}
                  />
                </li>
              );
            })}
          </Styled.ChatsList>
        ) : (
          <Typography>Here will be displayed chats</Typography>
        )}
      </Layout>
      <FriendsDialog
        isOpen={showFriends}
        friends={friends}
        onClose={() => setShowFriends(false)}
        userSummaryActionButtonsType="create-chat"
        onCreatedChat={() => setShowFriends(false)}
      />
    </>
  );
}

export default withProtected(Chats);
