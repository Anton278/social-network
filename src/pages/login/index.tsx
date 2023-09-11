import { useState } from "react";
import Layout from "../../components/Layout";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Styled from "./Login.styled";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Styled.Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Inputs>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              {...register("email")}
            />
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Styled.Inputs>
          <Styled.ButtonWrapper>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Styled.ButtonWrapper>
        </form>
      </Styled.Wrapper>
    </Layout>
  );
}

export default Login;
