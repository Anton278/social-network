import styled from "@emotion/styled";

export const Wrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const Inputs = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: "30px",
  marginBottom: "50px",
});

export const ButtonWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
});

export const ErrorWrapper = styled.div({
  marginTop: "30px",
  textAlign: "center",
});
