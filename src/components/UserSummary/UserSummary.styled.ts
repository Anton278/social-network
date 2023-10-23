import styled from "@emotion/styled";
import Link from "next/link";

export const Box = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const User = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "#000",
  width: "fit-content",
});
