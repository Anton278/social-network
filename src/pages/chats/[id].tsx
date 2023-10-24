import Layout from "@/components/Layout";
import { withProtected } from "@/hocs/withProtected";
import ChatTopBar from "@/components/ChatTopBar";
import ChatMessages from "@/components/ChatMessages";
import ChatBottomBar from "@/components/ChatBottomBar";

import * as Styled from "@/styles/Chat.styled";

function Chat() {
  return (
    <Layout
      layoutWrapperStyles={{ height: "100vh" }}
      mainNodeStyles={{ overflowY: "auto" }}
    >
      <Styled.PageWrapper>
        <ChatTopBar />
        <ChatMessages />
        <ChatBottomBar />
      </Styled.PageWrapper>
    </Layout>
  );
}

export default withProtected(Chat);
