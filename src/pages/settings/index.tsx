import Layout from "@/components/Layout";
import { useAppSelector } from "@/hooks/useAppSelector";
import { stringToColor } from "@/utils/stringToColor";
import {
  Avatar,
  Divider,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { withProtected } from "@/hocs/withProtected";
import { useState } from "react";
import * as Styled from "@/styles/Settings.styled";
import { RequestStatus } from "@/models/RequestStatus";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Settings() {
  const user = useAppSelector((state) => state.user);

  const [avatar, setAvatar] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  function onImgInputChange(files: FileList | null) {
    if (!files) {
      return;
    }

    if (files[0]) {
      URL.revokeObjectURL(avatar);
      setAvatar(URL.createObjectURL(files[0]));
    }
  }

  return (
    <Layout>
      <>
        <form>
          <Styled.AvatarWrapper>
            <Avatar
              src={avatar}
              alt="Avatar"
              sx={{
                bgcolor: stringToColor(user.fullName),
                width: 120,
                height: 120,
              }}
            >
              {user.status === RequestStatus.IDLE &&
                user.fullName.split(" ")[0][0]}
              {user.status === RequestStatus.IDLE &&
                user.fullName.split(" ")[1][0]}
            </Avatar>

            <Styled.EditAvatarButton>
              <EditIcon />
              <Styled.ImgInpLabel>
                <input
                  type="file"
                  accept="image/*"
                  id="imgInp"
                  style={{ display: "none" }}
                  onChange={(e) => onImgInputChange(e.target.files)}
                />
              </Styled.ImgInpLabel>
            </Styled.EditAvatarButton>
          </Styled.AvatarWrapper>
          <Styled.TopInputsWrapper>
            <TextField label="Email" variant="outlined" />
            <TextField label="Username" variant="outlined" />
            <TextField label="Fullname" variant="outlined" />
          </Styled.TopInputsWrapper>
          <Styled.FormButtons>
            <Button variant="outlined">Reset</Button>
            <Button variant="contained">Submit</Button>
          </Styled.FormButtons>
        </form>
        <Divider sx={{ margin: "20px 0" }} />
        <form>
          <Styled.TopInputsWrapper>
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
          </Styled.TopInputsWrapper>
          <Styled.FormButtons>
            <Button variant="outlined">Reset</Button>
            <Button variant="contained">Submit</Button>
          </Styled.FormButtons>
        </form>
      </>
    </Layout>
  );
}

export default withProtected(Settings);
