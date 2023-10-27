import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import NextLink from "next/link";
import { IconButton } from "@mui/material";

export const Wrapper = styled.div({
  position: "relative",

  "&:hover": {
    background: blue[50],
  },
});

export const Link = styled(NextLink)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 10px",
  color: "inherit",
  textDecoration: "none",
});

export const MoreButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  right: 10,
  transform: "translateY(-50%)",
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
