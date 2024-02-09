import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { register_wrapper } from "../styles/registerForm";
import useCloudinary from "../hooks/useCloudinaryMutation";
import { styled } from "@mui/material/styles";
import { useRegisterMutation } from "../redux/api/appApi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch } from "../redux/store";
import { setError } from "../redux/reducers/errorReducer";
import { useEffect } from "react";
import { setToken, setUser } from "../redux/reducers/userReducer";
import { setMessage } from "../redux/reducers/messageReducer";
import { AxiosResponse } from "axios";
import { PRESET } from "../utils/cloudinary";
import { User } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import { alert_typography } from "../styles/app";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function RegistrationForm() {
  const {
    control,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const submit_to_cloudinary = useCloudinary();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const link = (
    <Typography onClick={() => navigate("/dashboard")} sx={alert_typography}>
      Account created successfully! .Click here to go to the dashboard.
    </Typography>
  ) as unknown as string | Element;

  const onSubmit = async () => {
    const temp = getValues("avatar");
    if (temp === undefined) {
      return console.log("Undefined avatar");
    }
    const formData = new FormData();

    formData.append("file", temp[0]);
    formData.append("upload_preset", PRESET);
    try {
      await submit_to_cloudinary(formData).then((res) =>
        setValue("avatar", res)
      );
      const res = (await register({
        email: getValues("email"),
        username: getValues("username"),
        password: getValues("password"),
        avatar: getValues("avatar"),
      })) as AxiosResponse;
      const newUser = res.data as User;
      dispatch(setUser(newUser));
      dispatch(setToken(res.data.token));
      dispatch(setMessage(link));
    } catch (error) {
      dispatch(setError(`Registration error: ${error}`));
    }
  };

  useEffect(() => {
    if (errors.username) {
      dispatch(setError(`Username error: ${errors.username.message}`));
    }
    if (errors.email) {
      dispatch(setError(`Email error: ${errors.email.message}`));
    }
    if (errors.password) {
      dispatch(setError(`Password error: ${errors.password.message}`));
    }
    if (errors.confirmPassword) {
      dispatch(setError(`Password error: ${errors.confirmPassword.message}`));
    }
    if (errors.avatar) {
      dispatch(setError(`Avatar error: ${errors.avatar.message}`));
    }
  }, [
    dispatch,
    errors.avatar,
    errors.confirmPassword,
    errors.email,
    errors.password,
    errors.username,
  ]);
  return (
    <Container sx={register_wrapper}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email required!",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Provide a valid e-mail address!",
          },
        }}
        render={({ field }) => (
          <TextField
            id="email-standard-basic"
            label="Email"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        rules={{ required: "Username required!" }}
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
        control={control}
        rules={{ required: "Password required!" }}
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
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Confirm your password!",
          validate: (password) =>
            password === getValues("password") ||
            "The two passwords do not match!",
        }}
        render={({ field }) => (
          <TextField
            id="confirm-password-standard-basic"
            label="Confirm Password"
            type="password"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="avatar"
        control={control}
        rules={{ required: "Avatar required!" }}
        render={({ field }) => (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload avatar
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
            />
          </Button>
        )}
      />
      {isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
          size="large"
        >
          REGISTER
        </Button>
      )}
    </Container>
  );
}
