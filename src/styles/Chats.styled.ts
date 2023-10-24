import styled from "@emotion/styled";

export const TopBar = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 30,
});

export const ChatsList = styled.ul({
  listStyleType: "none",
  margin: 0,
  padding: 0,

  "li:not(:last-of-type)": { marginBottom: 20 },
});

export const ChatsListItem = styled.li({});
