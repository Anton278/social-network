import { AppBar, Toolbar, Box, Button } from "@mui/material";
import RouterLink from "next/link";

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Box sx={{ ml: "auto" }}>
          {/* <Button
            variant="text"
            component={RouterLink}
            sx={{ color: "#fff", mr: "10px" }}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="text"
            component={RouterLink}
            sx={{ color: "#fff" }}
            to="/login"
          >
            Signup
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
