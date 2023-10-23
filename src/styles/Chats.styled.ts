import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";

export const ChatsList = styled.ul({
  listStyleType: "none",
  margin: 0,
  padding: 0,

  "li:not(:last-of-type)": { marginBottom: 20 },
});

export const ChatsListItem = styled.li({
  cursor: "pointer",
  padding: "5px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

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
