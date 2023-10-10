import * as Styled from "./CommonSettings.styled";
import { Avatar, TextField, Button } from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";
import { RequestStatus } from "@/models/RequestStatus";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRegEx } from "@/utils/consts";

type Inputs = {
  email: string;
  username: string;
  fullName: string;
  // avatar: string; // ?
};

function CommonSettings() {
  const user = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <TextField
          label="Email"
          variant="outlined"
          {...register("email", { required: true, pattern: emailRegEx })}
          helperText={
            errors.email
              ? errors.email.type === "required"
                ? "Required"
                : "Invalid email"
              : " "
          }
          error={Boolean(errors.email)}
        />
        <TextField
          label="Username"
          variant="outlined"
          {...register("username", { required: true })}
          error={Boolean(errors.username)}
          helperText={errors.username ? "Required" : " "}
        />
        <TextField
          label="Fullname"
          variant="outlined"
          {...register("fullName", { required: true })}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName ? "Required" : " "}
        />
      </Styled.InputsWrapper>
      <Styled.FormButtons>
        <Button variant="outlined" type="reset">
          Reset
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Styled.FormButtons>
    </form>
  );
}

export default CommonSettings;
