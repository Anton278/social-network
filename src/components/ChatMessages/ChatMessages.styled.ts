import styled from "@emotion/styled";
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

export const NoMessages = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const DayDivider = styled.li({ alignSelf: "center", margin: "5px 0" });
