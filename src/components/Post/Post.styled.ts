import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

export const TopBar = styled.div({
  display: "flex",
  columnGap: "6px",
  alignItems: "center",
});

export const PrivateMarker = styled.span({
  color: grey[600],
});

export const PostBody = styled.p({
  marginBottom: 0,
});

export const CommentsBtnWrapper = styled.div({
  marginTop: "20px",
});

export const ToggleFullTxtBtn = styled.button({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "inherit",
  fontFamily: "inherit",
  color: grey[700],
});
