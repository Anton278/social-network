import styled from "@emotion/styled";
import Link from "next/link";

export const TopBar = styled.div({ display: "flex" });

export const TopBarRight = styled.div({
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-around",
  flexGrow: 1,
  alignItems: "center",
});

export const PostsButton = styled.button({
  border: "none",
  background: "none",
  padding: "5px 15px",
  cursor: "pointer",
  fontSize: "1rem",
});

export const FriendsLink = styled(Link)({
  color: "#000",
  textDecoration: "none",
  textAlign: "center",
  padding: "5px 15px",
});

export const TopBarLeft = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ActionsBar = styled.div({
  margin: "45px 0 0",
  display: "flex",
  justifyContent: "space-around",
});
