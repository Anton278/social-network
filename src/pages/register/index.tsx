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
import { emailRegEx } from "@/emailRegEx";

type FormValues = {
  email: string;
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

    const { email, password } = values;

    try {
      const res = await api.post("/register", { email, password });
      console.log("client side user ===> ", res.data.user);
    } catch (e: any) {
      if (e.response.data.message === "auth/email-already-in-use") {
        setError("Error: Email already in use");
      } else {
        setError("Failed to create user");
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
            >
              Register
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

export default Register;
