import { Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Avatar from "@/components/Avatar";
import Layout from "@/components/Layout";
import { withProtected } from "@/hocs/withProtected";

import * as Styled from "@/styles/Chats.styled";

function Chats() {
  return (
    <Layout>
      <Styled.ChatsList>
        <Styled.ChatsListItem>
          <Styled.ChatSummary>
            <Avatar fullName="John Doe" />
            <div>
              <Typography component="h5" sx={{ fontWeight: "bold" }}>
                John Doe
              </Typography>
              <p>Last message</p>
            </div>
          </Styled.ChatSummary>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Styled.ChatsListItem>
        <Styled.ChatsListItem>
          <Styled.ChatSummary>
            <Avatar fullName="Oleg Liashko" />
            <div>
              <Typography component="h5" sx={{ fontWeight: "bold" }}>
                Oleg Liashko
              </Typography>
              <p>Last message</p>
            </div>
          </Styled.ChatSummary>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Styled.ChatsListItem>
      </Styled.ChatsList>
    </Layout>
  );
}

export default withProtected(Chats);
