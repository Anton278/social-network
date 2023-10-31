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
      <Toolbar>
        {isAuthed && (
          <Styled.MenuButton size="large" onClick={() => setOpen(true)}>
            <MenuIcon />
          </Styled.MenuButton>
        )}
        <Menu open={open} onClose={() => setOpen(false)} />
        <Typography variant="h5">Social Network</Typography>
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
            <div data-testid="register-or-login-box">
              <Button
                variant="text"
                component={RouterLink}
                sx={{ color: "#fff", mr: "10px" }}
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="text"
                component={RouterLink}
                sx={{ color: "#fff" }}
                href="/register"
              >
                Signup
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
