import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import RouterLink from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/redux/slices/auth/selectors";
import authService from "@/services/Auth";

function Header() {
  const router = useRouter();
  const isAuthed = useSelector(selectIsAuthed);

  async function handleLogout() {
    await authService.logout();
    router.push("/login");
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h5">Social Network</Typography>
        <Box sx={{ ml: "auto" }}>
          {isAuthed ? (
            <Button
              variant="text"
              sx={{ color: "#fff", mr: "10px" }}
              onClick={handleLogout}
              data-testid="logout-btn"
            >
              Logout
            </Button>
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
