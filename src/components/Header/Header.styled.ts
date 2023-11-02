import styled from "@emotion/styled";
import { IconButton, Button } from "@mui/material";
import { grey, blue } from "@mui/material/colors";

export const MenuButton = styled(IconButton)({
  color: "#fff",
  marginRight: 10,
  display: "flex",

  "@media(min-width: 900px)": { display: "none" },
});

export const LoginButton = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    color: "#fff",
    borderColor: active ? grey[100] : blue[700],
    marginRight: "10px",

    "&:hover": { borderColor: active ? grey[100] : blue[700] },
  })
);

export const SignupButton = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    color: "#fff",
    borderColor: active ? grey[100] : blue[700],

    "&:hover": { borderColor: active ? grey[100] : blue[700] },
  })
);

export const RegisterOrLoginBox = styled.div({
  display: "flex",
});

export const ButtonIcon = styled.span({
  display: "inline-flex",

  "@media(min-width: 600px)": {
    display: "none",
  },
});

export const Buttontext = styled.span({
  display: "none",

  "@media(min-width: 600px)": {
    display: "inline-flex",
  },
});
