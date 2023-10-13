import * as Styled from "./CommonSettings.styled";
import { TextField, Button } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRegEx } from "@/utils/consts";
import EditAvatar from "../EditAvatar";
import { useState, useEffect, ChangeEvent } from "react";
import { RequestStatus } from "@/models/RequestStatus";

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

  // made controlled inputs with react-hook-form because when
  // set value through react-hook-form - input's label doesn't
  // lift up, it stays behind input's text
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    if (user.status !== RequestStatus.IDLE) {
      return;
    }

    setEmail(user.email);
    setUsername(user.username);
    setFullName(user.fullName);
  }, [user]);

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const { onChange } = register("email");
    setEmail(e.target.value);
    onChange(e);
  }

  function onUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    const { onChange } = register("username");
    setUsername(e.target.value);
    onChange(e);
  }

  function onFullnameChange(e: ChangeEvent<HTMLInputElement>) {
    const { onChange } = register("fullName");
    setFullName(e.target.value);
    onChange(e);
  }

  function onResetClick() {
    setEmail("");
    setUsername("");
    setFullName("");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditAvatar
        avatar={newAvatar}
        onChange={(avatar) => setNewAvatar(avatar)}
      />
      <Styled.InputsWrapper>
        <TextField
          value={email}
          {...register("email", { required: true, pattern: emailRegEx })}
          onChange={onEmailChange}
          label="Email"
          variant="outlined"
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
          value={username}
          {...register("username", { required: true })}
          onChange={onUsernameChange}
          label="Username"
          variant="outlined"
          error={Boolean(errors.username)}
          helperText={errors.username ? "Required" : " "}
        />
        <TextField
          value={fullName}
          {...register("fullName", { required: true })}
          onChange={onFullnameChange}
          label="Fullname"
          variant="outlined"
          error={Boolean(errors.fullName)}
          helperText={errors.fullName ? "Required" : " "}
        />
      </Styled.InputsWrapper>
      <Styled.FormButtons>
        <Button variant="outlined" type="reset" onClick={onResetClick}>
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
