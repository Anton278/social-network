import styled from "@emotion/styled";
import { green, lime, grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

export const MessagesList = styled.ol({
  listStyleType: "none",
  flexGrow: 1,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  overflow: "auto",
  margin: "20px 0",
  position: "relative",
});

export const Message = styled.li<{ isUserMessage?: boolean }>(
  ({ isUserMessage }) => ({
    alignSelf: isUserMessage ? "flex-end" : "flex-start",
    padding: "7px 10px",
    background: isUserMessage ? green[200] : lime[200],
    borderRadius: 4,
  })
);

export const SentAt = styled(Typography)({
  marginBottom: 0,
  marginTop: 5,
  color: grey[800],
});

export const NoMessages = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
