import styled from "@emotion/styled";
import Link from "next/link";

export const List = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: "20px",
});

export const User = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "#000",
});
