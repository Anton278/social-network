import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const LayoutWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const Main = styled(Container)({
  marginTop: "84px",
  marginBottom: 20,
  display: "flex",
  columnGap: "30px",
  flexGrow: 1,
});

export const ContentWrapper = styled.div({ width: "100%" });
