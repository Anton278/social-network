import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const LayoutWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const Main = styled(Container)({
  marginTop: "84px",
  display: "flex",
  padding: "0 24px",
  columnGap: "30px",
  marginBottom: "30px",
});

export const ContentWrapper = styled.div({ width: "100%" });
