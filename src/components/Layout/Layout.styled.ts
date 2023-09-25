import styled from "@emotion/styled";

export const LayoutWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const Main = styled.div({
  marginTop: "84px",
  display: "flex",
  padding: "0 24px",
  columnGap: "30px",
});

export const ContentWrapper = styled.div({ flexGrow: 1 });
