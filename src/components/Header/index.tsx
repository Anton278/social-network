import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import RouterLink from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { selectIsAuthed } from "@/redux/slices/auth/selectors";
import authService from "@/services/Auth";
import Menu from "../Menu";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

import * as Styled from "./Header.styled";

function Header() {
  const router = useRouter();
  const isAuthed = useSelector(selectIsAuthed);

  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  async function handleLogout() {
    await authService.logout();
    router.push("/login");
  }

  return (
    <AppBar>
      <Toolbar sx={{ columnGap: "10px" }}>
        <div>
          {isAuthed && (
            <Styled.MenuButton size="large" onClick={() => setOpen(true)}>
              <MenuIcon />
            </Styled.MenuButton>
          )}
          <Menu open={open} onClose={() => setOpen(false)} />
          <Typography variant="h5">Social Network</Typography>
        </div>
        <Box sx={{ ml: "auto" }}>
          {isAuthed ? (
            width ? (
              width <= 899 ? (
                <IconButton sx={{ color: "#fff" }} onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              ) : (
                <Button
                  variant="text"
                  sx={{ color: "#fff", mr: "10px" }}
                  onClick={handleLogout}
                  data-testid="logout-btn"
                >
                  Logout
                </Button>
              )
            ) : null
          ) : (
            <Styled.RegisterOrLoginBox data-testid="register-or-login-box">
              <Styled.LoginButton
                variant="outlined"
                // @ts-expect-error
                component={RouterLink}
                href="/login"
                active={router.pathname === "/login"}
              >
                <Styled.ButtonIcon>
                  <LoginIcon />
                </Styled.ButtonIcon>
                <Styled.Buttontext>Login</Styled.Buttontext>
              </Styled.LoginButton>
              <Styled.SignupButton
                variant="outlined"
                // @ts-expect-error
                component={RouterLink}
                sx={{ color: "#fff" }}
                href="/register"
                active={router.pathname === "/register"}
              >
                <Styled.ButtonIcon>
                  <AppRegistrationIcon />
                </Styled.ButtonIcon>
                <Styled.Buttontext>Signup</Styled.Buttontext>
              </Styled.SignupButton>
            </Styled.RegisterOrLoginBox>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
