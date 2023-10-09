import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import RouterLink from "next/link";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/redux/slices/auth/selectors";

function Header() {
  const router = useRouter();
  const { auth } = useFirebaseAuth();
  const isAuthed = useSelector(selectIsAuthed);

  async function handleLogout() {
    await signOut(auth);
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
            >
              Logout
            </Button>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
