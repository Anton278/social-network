import styled from "@emotion/styled";
import { green, lime } from "@mui/material/colors";

export const MessagesList = styled.ol({
  listStyleType: "none",
  flexGrow: 1,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  overflow: "auto",
  margin: "20px 0",
});

export const Message = styled.li<{ isUserMessage?: boolean }>(
  ({ isUserMessage }) => ({
    alignSelf: isUserMessage ? "flex-end" : "flex-start",
    padding: "7px 10px",
    background: isUserMessage ? green[200] : lime[200],
    borderRadius: 4,
  })
);
