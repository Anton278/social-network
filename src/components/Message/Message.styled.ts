import styled from "@emotion/styled";
import { green, lime, grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

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
