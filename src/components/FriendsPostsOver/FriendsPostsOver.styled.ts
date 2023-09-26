import styled from "@emotion/styled";

export const Wrapper = styled.div({
  margin: "50px 0",
});

export const DividerWrapper = styled.div({ position: "relative" });

export const ImageWrapper = styled.div({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120px",
  background: "#fff",
  textAlign: "center",
});
