import {
  Container,
  TextField,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { login_wrapper } from "../styles/loginForm";
import { setToken, setUser } from "../redux/reducers/userReducer";
import { useAppDispatch } from "../redux/store";
import { alert_typography, button_style } from "../styles/app";
import { useEffect } from "react";
import { setError } from "../redux/reducers/errorReducer";
import { setMessage } from "../redux/reducers/messageReducer";
import { AxiosResponse } from "axios";
import { useLoginMutation } from "../redux/api/appApi";
import { User } from "../types/UserType";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const link = (
    <Typography onClick={() => navigate("/dashboard")} sx={alert_typography}>
      You logged in successfully! .Click here to go to the dashboard.
    </Typography>
  ) as unknown as string | Element;
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [login, { isLoading, isError }] = useLoginMutation();

  const onSubmit = async () => {
    const input = {
      username: getValues("username"),
      password: getValues("password"),
    };
    try {
      const res = (await login(input)) as AxiosResponse;
      const currentUser = res.data as User;
      dispatch(setUser(currentUser));
      if(currentUser !== undefined){
      dispatch(setToken(res.data.token));
      localStorage.setItem("User", JSON.stringify(currentUser))
      dispatch(setMessage(link));
      }
      if(isError){
       dispatch(setError(`Unsuccessful login.`));
      }
    } catch (error) {
      dispatch(setError(`Log in error: ${error}`));
    }
  };

  useEffect(() => {
    if (errors.username) {
      dispatch(setError(`Email error: ${errors.username.message}`));
    }
    if (errors.password) {
      dispatch(setError(`Email error: ${errors.password.message}`));
    }
  }, [dispatch, errors.password, errors.username]);

  const isNotEmpty = (value: string) => value.trim() !== "";
  return (
    <Container sx={login_wrapper} component="form">
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "Username is required",
          },
          validate: (value: string) =>
            isNotEmpty(value) || "Username cannot be empty!",
        }}
        render={({ field }) => (
          <TextField
            id="username-standard-basic"
            label="Username"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: "Password is required",
          },
          validate: (value: string) =>
            isNotEmpty(value) || "Password cannot be empty!",
        }}
        render={({ field }) => (
          <TextField
            id="password-standard-basic"
            label="Password"
            type="password"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      {isLoading ? (
        <Button sx={button_style}>
          <CircularProgress />
        </Button>
      ) : (
        <Button
          type="submit"
          variant="outlined"
          size="large"
          onClick={handleSubmit(onSubmit)}
          sx={button_style}
        >
          LOGIN
        </Button>
      )}
    </Container>
  );
}
