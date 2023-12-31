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

import Layout from "../../components/Layout";
import Spinner from "@/components/Spinner";
import { emailRegEx } from "@/utils/consts";
import { withPublic } from "@/hocs/withPublic";
import authService from "@/services/Auth";
import usersService from "@/services/Users";

import * as Styled from "@/styles/Login.styled";

type FormValues = {
  emailOrUsername: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsSubmitting(true);
    setError("");

    const { emailOrUsername, password } = values;

    const isEmail = emailRegEx.test(emailOrUsername);
    const clientErrors = [
      "auth/invalid-email",
      "auth/user-disabled",
      "auth/user-not-found",
      "auth/wrong-password",
    ];
    if (isEmail) {
      try {
        await authService.login(emailOrUsername, password);
      } catch (err: any) {
        setError(
          clientErrors.includes(err.code)
            ? "Wrong email or password"
            : "Failed to login"
        );
      } finally {
        setIsSubmitting(false);
        return;
      }
    }
    try {
      const users = await usersService.getAll();

      const user = users.find((user) => user.username === emailOrUsername);
      if (!user) {
        return setError("Wrong username or password");
      }

      await authService.login(user.email, password);
    } catch (err: any) {
      setError(
        clientErrors.includes(err.code)
          ? "Wrong username or password"
          : "Failed to login"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Social Network</title>
      </Head>
      <Layout>
        <Styled.Wrapper>
          <div>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              Login
            </Typography>
            <Typography sx={{ textAlign: "center", marginBottom: "30px" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register">Sign up here</Link>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Styled.Inputs>
                <TextField
                  label="Email or Username"
                  variant="outlined"
                  {...register("emailOrUsername", {
                    required: true,
                  })}
                  error={Boolean(errors.emailOrUsername)}
                  helperText={errors.emailOrUsername && "Required"}
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
              </Styled.Inputs>
              <Styled.ButtonWrapper>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={isSubmitting ? <Spinner /> : null}
                  data-testid="login-btn"
                >
                  Login
                </Button>
              </Styled.ButtonWrapper>
            </form>
            {error && (
              <Styled.ErrorWrapper>
                <Typography color="error" data-testid="error">
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

export default withPublic(Login);
