import { useState } from "react";
import Layout from "../../components/Layout";
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
import * as Styled from "@/styles/Login.styled";
import Spinner from "@/components/Spinner";
import { emailRegEx } from "@/utils/consts";
import { withPublic } from "@/hocs/withPublic";
import authService from "@/services/Auth";
import usersService from "@/services/Users";
import Link from "next/link";

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
    try {
      if (isEmail) {
        await authService.login(emailOrUsername, password);
      } else {
        const users = await usersService.getAll();

        const user = users.find((user) => user.username === emailOrUsername);
        if (!user) {
          return setError("Wrong username or password");
        }

        await authService.login(user.email, password);
      }
    } catch (e: any) {
      if (["auth/user-not-found", "auth/wrong-password"].includes(e.code)) {
        setError("Wrong email or password");
      } else {
        setError("Failed to login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Styled.Wrapper>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Login
        </Typography>
        <Typography sx={{ textAlign: "center", marginBottom: "30px" }}>
          Don&apos;t have an account? <Link href="/register">Sign up here</Link>
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
      </Styled.Wrapper>
    </Layout>
  );
}

export default withPublic(Login);
