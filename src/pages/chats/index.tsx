import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ChatSummary from "@/components/ChatSummary";
import { withProtected } from "@/hocs/withProtected";
import FriendsDialog from "@/components/FriendsDialog";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Chat } from "@/models/Chat";
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
  const chatIds = useAppSelector((state) => state.user.chats);
  const friends = useAppSelector((state) => state.user.friends);
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const chats = useAppSelector((state) => state.chats.chats);
  const chatsStatus = useAppSelector((state) => state.chats.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  useEffect(() => {
    if (
      userStatus !== RequestStatus.IDLE ||
      chatsStatus !== RequestStatus.IDLE
    ) {
      return;
    }
    const userChats = chats.filter((chat) => chatIds.includes(chat.id));
    setUserChats(userChats);
    setIsLoading(false);
  }, [userStatus, chatsStatus]);

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
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Styled.ChatsList>
            {userChats.map((chat) => {
              const interlocutor = chat.participants.find(
                (participants) => participants.id !== userId
              );
              return (
                <li key={chat.id}>
                  <ChatSummary id={chat.id} interlocutor={interlocutor} />
                </li>
              );
            })}
          </Styled.ChatsList>
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
