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
import { api } from "@/http/api";
import Spinner from "@/components/Spinner";
import { emailRegEx } from "@/emailRegex";

type FormValues = {
  email: string;
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

    try {
      const res = await api.post("/login", values);
      console.log("client side user ===> ", res.data);
    } catch (e: any) {
      if (
        ["auth/user-not-found", "auth/wrong-password"].includes(
          e.response.data.message
        )
      ) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Inputs>
            <TextField
              id="standard-basic"
              label="Email"
              variant="outlined"
              {...register("email", { required: true, pattern: emailRegEx })}
              error={Boolean(errors.email)}
              helperText={
                errors.email &&
                (errors.email.type === "pattern" ? "Invalid email" : "Required")
              }
            />
            <TextField
              error={Boolean(errors.password)}
              id="standard-basic"
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
            >
              Login
            </Button>
          </Styled.ButtonWrapper>
        </form>
        <Styled.ErrorWrapper>
          <Typography color="error">{error}</Typography>
        </Styled.ErrorWrapper>
      </Styled.Wrapper>
    </Layout>
  );
}

export default Login;
