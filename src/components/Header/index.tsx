import { AppBar, Toolbar, Box, Button } from "@mui/material";
import RouterLink from "next/link";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/redux/slices/auth/selectors";
import * as Styled from "./Header.styled";

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
        {isAuthed && (
          <nav>
            <Styled.Links>
              <li>
                <Button
                  component={RouterLink}
                  href="/posts"
                  style={{
                    textDecoration:
                      router.pathname === "/posts" ? "underline" : "none",
                  }}
                  sx={{
                    color: "#fff",
                  }}
                >
                  Posts
                </Button>
              </li>
              <li>
                <Button
                  component={RouterLink}
                  href={`/profile/${auth.currentUser?.uid}`}
                  sx={{ color: "#fff" }}
                  style={{
                    textDecoration:
                      window.location.pathname ===
                      `/profile/${auth.currentUser?.uid}`
                        ? "underline"
                        : "none",
                  }}
                >
                  My profile
                </Button>
              </li>
              <li>
                <Button
                  component={RouterLink}
                  href="/all-profiles"
                  sx={{ color: "#fff" }}
                  style={{
                    textDecoration:
                      router.pathname === "/all-profiles"
                        ? "underline"
                        : "none",
                  }}
                >
                  All profiles
                </Button>
              </li>
            </Styled.Links>
          </nav>
        )}
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
