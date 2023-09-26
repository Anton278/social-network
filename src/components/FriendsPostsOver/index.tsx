import * as Styled from "./FriendsPostsOver.styled";
import { Divider, Typography } from "@mui/material";
import Image from "next/image";

function FriendsPostsOver() {
  return (
    <Styled.Wrapper>
      <Typography
        variant="h5"
        sx={{ marginBottom: "50px", textAlign: "center" }}
      >
        Posts from your friends are over
      </Typography>
      <Styled.DividerWrapper>
        <Divider />
        <Styled.ImageWrapper>
          <Image src="/done.png" alt="Done" width={80} height={80} />
        </Styled.ImageWrapper>
      </Styled.DividerWrapper>
      <Typography sx={{ textAlign: "center", marginTop: "50px" }}>
        View posts from other users
      </Typography>
    </Styled.Wrapper>
  );
}

export default FriendsPostsOver;
