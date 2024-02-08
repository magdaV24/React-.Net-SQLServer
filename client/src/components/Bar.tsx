import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { clearUser, getUser } from "../redux/reducers/userReducer";
import HistoryEduSharpIcon from "@mui/icons-material/HistoryEduSharp";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../utils/cloudinaryFnc";
import { useNavigate } from "react-router-dom";

export default function Bar() {
  const user = useAppSelector((state: RootState) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser());
  };
  const cld = cloudinaryFnc();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  },[dispatch, user]);
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <HistoryEduSharpIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Minerva
        </Typography>
        {user ? (
          <Box
            sx={{
              gap: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography onClick={() => navigate(`/home/${user.userName}`)}>Welcome back, {user.userName}</Typography>
            <Box>
              <AdvancedImage
                cldImg={cld
                  .image(user.avatar)
                  .resize(fill().width(50).height(50))}
              />
            </Box>
            <Button onClick={handleLogout} variant="outlined">
              LOGOUT
            </Button>
            <Button onClick={() => navigate("/cardForm")} variant="outlined">
              Add card
            </Button>
          </Box>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
