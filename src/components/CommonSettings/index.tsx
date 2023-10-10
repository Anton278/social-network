import * as Styled from "./CommonSettings.styled";
import { TextField, Button } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRegEx } from "@/utils/consts";
import EditAvatar from "../EditAvatar";
import { useState } from "react";

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

  const [newAvatar, setNewAvatar] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditAvatar
        avatar={newAvatar}
        onChange={(avatar) => setNewAvatar(avatar)}
      />
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
