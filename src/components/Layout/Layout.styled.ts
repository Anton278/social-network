import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const LayoutWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const Main = styled(Container)({
  marginTop: "84px",
}) as typeof Container;
