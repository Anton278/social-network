import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export const Input = styled(TextField)({
  marginRight: 15,
  background: "#fff",
});

export const BottomBar = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
  backgroundColor: grey[200],
  borderRadius: 8,
});
