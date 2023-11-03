import { useState } from "react";
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
import Link from "next/link";
import Head from "next/head";

import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { emailRegEx } from "@/utils/consts";
import { withPublic } from "@/hocs/withPublic";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import usersService from "@/services/Users";
import authService from "@/services/Auth";

import * as Styled from "@/styles/Register.styled";

type FormValues = {
  email: string;
  username: string;
  fullName: string;
  password: string;
  repeatPassword: string;
};

function Register() {
  const dispatch = useAppDispatch();
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

    const { email, password, username, fullName } = values;
    let registeredUserId: string | undefined;

    try {
      const users = await usersService.getAll();

      const userWithSameUsername = users.find(
        (user) => user.username === username
      );

      if (userWithSameUsername) {
        setIsSubmitting(false);
        setError("User with this username already exist");
        return;
      }

      const registeredUser = await authService.register(email, password);
      registeredUserId = registeredUser.user.uid;
    } catch (e: any) {
      setError(
        e.code === "auth/email-already-in-use"
          ? "Error: Email already in use"
          : e.code === "auth/weak-password"
          ? "The password is too weak."
          : "Failed to create user"
      );
      return setIsSubmitting(false);
    }

    try {
      const createdUser = await usersService.create(
        email,
        username,
        fullName,
        registeredUserId
      );
      dispatch({ type: "user/setUser", payload: createdUser });
    } catch (e: any) {
      setError("Failed to create user");
      await authService.delete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Signup | Social Network</title>
      </Head>
      <Layout>
        <Styled.Wrapper>
          <div>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              Sign Up
            </Typography>
            <Typography sx={{ textAlign: "center", marginBottom: "30px" }}>
              Already have an account? <Link href="/login">Log in here</Link>
            </Typography>
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
                    (errors.email.type === "pattern"
                      ? "Invalid email"
                      : "Required")
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
          </div>
        </Styled.Wrapper>
      </Layout>
    </>
  );
}

export default withPublic(Register);
