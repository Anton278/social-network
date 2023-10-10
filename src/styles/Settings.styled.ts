import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const AvatarWrapper = styled.div({
  position: "relative",
  width: "fit-content",
  margin: "0 auto",
  marginBottom: "35px",
});

export const EditAvatarButton = styled(IconButton)({
  position: "absolute",
  bottom: -10,
  right: -10,
});

export const ImgInpLabel = styled.label({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
});

export const TopInputsWrapper = styled.div({
  display: "flex",
  gap: 20,
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
});

export const FormButtons = styled.div({
  display: "flex",
  justifyContent: "center",
  columnGap: "25px",
  marginTop: 40,
});
