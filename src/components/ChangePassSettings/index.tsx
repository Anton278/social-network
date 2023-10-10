import * as Styled from "./ChangePassSettings.styled";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function ChangePassSettings() {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  return (
    <form>
      <Styled.InputsWrapper>
        <TextField
          label="Old password"
          variant="outlined"
          type={showOldPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowOldPass(!showOldPass)}
                  edge="end"
                >
                  {showOldPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New password"
          variant="outlined"
          type={showNewPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowNewPass(!showNewPass)}
                  edge="end"
                >
                  {showNewPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField label="Repeat new password" variant="outlined" />
      </Styled.InputsWrapper>
      <Styled.FormButtons>
        <Button variant="outlined">Reset</Button>
        <Button variant="contained">Submit</Button>
      </Styled.FormButtons>
    </form>
  );
}

export default ChangePassSettings;
