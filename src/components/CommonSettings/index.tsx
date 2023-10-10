import * as Styled from "./CommonSettings.styled";
import { Avatar, TextField, Button } from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";
import { RequestStatus } from "@/models/RequestStatus";

function CommonSettings() {
  const user = useAppSelector((state) => state.user);

  const [avatar, setAvatar] = useState("");

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
          {user.status === RequestStatus.IDLE && user.fullName.split(" ")[0][0]}
          {user.status === RequestStatus.IDLE && user.fullName.split(" ")[1][0]}
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
      <Styled.InputsWrapper>
        <TextField label="Email" variant="outlined" />
        <TextField label="Username" variant="outlined" />
        <TextField label="Fullname" variant="outlined" />
      </Styled.InputsWrapper>
      <Styled.FormButtons>
        <Button variant="outlined">Reset</Button>
        <Button variant="contained">Submit</Button>
      </Styled.FormButtons>
    </form>
  );
}

export default CommonSettings;
