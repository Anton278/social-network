import styled from "@emotion/styled";
import Link from "next/link";
import { grey } from "@mui/material/colors";

export const TopLine = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: "6px",
});

export const Author = styled(Link)({
  color: "#000",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
});

export const Marker = styled.span({
  color: grey[700],
});

export const TimeAndEdited = styled.p({
  display: "flex",
  columnGap: 6,
  color: grey[700],
});
