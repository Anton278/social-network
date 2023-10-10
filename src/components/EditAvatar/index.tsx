import * as Styled from "./EditAvatar.styled";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import EditIcon from "@mui/icons-material/Edit";
import { RequestStatus } from "@/models/RequestStatus";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

type EditAvatarProps = {
  avatar: string;
  onChange: (avatar: string) => void;
};

function EditAvatar(props: EditAvatarProps) {
  const { avatar, onChange } = props;

  const user = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function onImgInputChange(files: FileList | null) {
    if (!files) {
      return;
    }

    if (files[0]) {
      URL.revokeObjectURL(avatar);
      setAnchorEl(null);
      onChange(URL.createObjectURL(files[0]));
    }
  }

  function onDeleteClick() {
    URL.revokeObjectURL(avatar);
    onChange("");
    setAnchorEl(null);
  }

  return (
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem sx={{ position: "relative" }}>
          <Styled.ImgInpLabel>
            <input
              type="file"
              accept="image/*"
              id="imgInp"
              style={{ display: "none" }}
              onChange={(e) => onImgInputChange(e.target.files)}
            />
          </Styled.ImgInpLabel>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change photo</ListItemText>
        </MenuItem>
        <MenuItem
          sx={{
            color: red[400],
          }}
          onClick={onDeleteClick}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: red[400] }} />
          </ListItemIcon>
          <ListItemText>Delete photo</ListItemText>
        </MenuItem>
      </Menu>

      <Styled.EditAvatarButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <EditIcon />
      </Styled.EditAvatarButton>
    </Styled.AvatarWrapper>
  );
}

export default EditAvatar;
