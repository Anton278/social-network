import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import Layout from "@/components/Layout";
import ChatSummary from "@/components/ChatSummary";
import { withProtected } from "@/hocs/withProtected";
import FriendsDialog from "@/components/FriendsDialog";
import { useAppSelector } from "@/hooks/useAppSelector";

import * as Styled from "@/styles/Chats.styled";

function Chats() {
  const [showFriends, setShowFriends] = useState(false);
  const chatIds = useAppSelector((state) => state.user.chats);
  const friends = useAppSelector((state) => state.user.friends);
  // const chats = useAppSelector()

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
        <Styled.ChatsList>
          <li>
            <ChatSummary />
          </li>
          <li>
            <ChatSummary />
          </li>
        </Styled.ChatsList>
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
