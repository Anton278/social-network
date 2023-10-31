import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const MenuButton = styled(IconButton)({
  color: "#fff",
  marginRight: 10,
  display: "flex",

  "@media(min-width: 900px)": { display: "none" },
});
