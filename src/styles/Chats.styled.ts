import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import NextLink from "next/link";

export const ChatsList = styled.ul({
  listStyleType: "none",
  margin: 0,
  padding: 0,

  "li:not(:last-of-type)": { marginBottom: 20 },
});

export const ChatsListItem = styled.li({});

export const Link = styled(NextLink)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 10px",
  color: "inherit",
  textDecoration: "none",

  "&:hover": {
    background: blue[50],
  },
});

export const ChatSummary = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: 15,

  p: {
    marginTop: 5,
    marginBottom: 0,
  },
});
