import { useState } from "react";
import Layout from "@/components/Layout";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Styled from "@/styles/Register.styled";
import { api } from "@/http/api";
import Spinner from "@/components/Spinner";
import { emailRegEx } from "@/utils/consts";
import { User } from "@/models/User";

type FormValues = {
  email: string;
  username: string;
  fullName: string;
  password: string;
  repeatPassword: string;
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const watchPassword = watch("password");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsSubmitting(true);
    setError("");

    const { email, password, username } = values;

    try {
      const users = await api.get<User[]>("/users");

      const userWithSameUsername = users.data.find(
        (user) => user.username === username
      );

      if (userWithSameUsername) {
        return setError("User with this username already exist");
      }

      const registerRes = await api.post("/auth/register", { email, password });

      await api.post("/users", {
        email,
        username,
        userId: registerRes.data.uid,
      });
    } catch (e: any) {
      if (e.response?.data?.message === "auth/email-already-in-use") {
        setError("Error: Email already in use");
      } else {
        setError("Failed to create user");

        if (e.response?.data?.code === "users/create-user-error") {
          // when create user req fails, delete user in firebase auth
          await api.delete("/auth/delete");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Styled.Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Inputs>
            <TextField
              error={Boolean(errors.email)}
              label="Email"
              variant="outlined"
              {...register("email", {
                required: true,
                pattern: emailRegEx,
              })}
              helperText={
                errors.email &&
                (errors.email.type === "pattern" ? "Invalid email" : "Required")
              }
            />
            <TextField
              error={Boolean(errors.username)}
              label="Username"
              variant="outlined"
              {...register("username", {
                required: true,
              })}
              helperText={errors.username && "Required"}
            />
            <TextField
              error={Boolean(errors.fullName)}
              label="Full name"
              variant="outlined"
              {...register("fullName", { required: true })}
              helperText={errors.fullName && "Required"}
            />
            <TextField
              error={Boolean(errors.password)}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              helperText={errors.password && "Required"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="password"
              label="Repeat password"
              variant="outlined"
              {...register("repeatPassword", {
                required: true,
                validate: (value) => value === watchPassword,
              })}
              error={Boolean(errors.repeatPassword)}
              helperText={
                errors.repeatPassword &&
                (errors.repeatPassword?.type === "required"
                  ? "Requied"
                  : "Password doesn't match")
              }
            />
          </Styled.Inputs>
          <Styled.ButtonWrapper>
            <Button
              variant="contained"
              type="submit"
              endIcon={isSubmitting ? <Spinner /> : null}
              data-testid="submit-btn"
            >
              Register
            </Button>
          </Styled.ButtonWrapper>
        </form>
        {error && (
          <Styled.ErrorWrapper>
            <Typography color="error" data-testid="error-txt">
              {error}
            </Typography>
          </Styled.ErrorWrapper>
        )}
      </Styled.Wrapper>
    </Layout>
  );
}

export default Register;
