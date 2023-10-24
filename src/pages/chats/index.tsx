import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Layout from "@/components/Layout";
import ChatSummary from "@/components/ChatSummary";
import { withProtected } from "@/hocs/withProtected";

import * as Styled from "@/styles/Chats.styled";

function Chats() {
  return (
    <Layout>
      <Styled.TopBar>
        <Button variant="outlined" startIcon={<AddIcon />}>
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
  );
}

export default withProtected(Chats);
