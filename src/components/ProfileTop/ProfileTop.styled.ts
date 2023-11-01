import styled from "@emotion/styled";

export const TopBar = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: 30,
});

export const Counts = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexGrow: 1,
});

export const PostsCount = styled.div({
  textAlign: "center",
});

export const FriendsCount = styled.button({
  background: "transparent",
  padding: 0,
  border: "none",
  cursor: "pointer",
});

export const InfoBar = styled.div({
  marginTop: 20,

  "p:first-of-type": {
    marginBottom: 5,
  },
});
