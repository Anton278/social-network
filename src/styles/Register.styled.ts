import styled from "@emotion/styled";

export const Wrapper = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
