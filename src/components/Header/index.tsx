import { AppBar, Toolbar, Box, Button } from "@mui/material";
import RouterLink from "next/link";

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Box sx={{ ml: "auto" }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
