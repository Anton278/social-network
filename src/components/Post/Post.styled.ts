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
