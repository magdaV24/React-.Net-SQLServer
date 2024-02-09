import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { clearUser } from "../redux/reducers/userReducer";
import HistoryEduSharpIcon from "@mui/icons-material/HistoryEduSharp";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../utils/cloudinaryFnc";
import { useNavigate } from "react-router-dom";
import { button_box } from "../styles/bar";

export default function Bar() {
  const user = useAppSelector((state: RootState) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser());
  };
  const cld = cloudinaryFnc();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate('/dashboard')}
        >
          <HistoryEduSharpIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Minerva
        </Typography>
        {user ? (
          <Box
            sx={button_box}
          >
            <Typography onClick={() => navigate(`/home/${user.userName}`)}>Welcome back, {user.userName}</Typography>
            <Box>
              <AdvancedImage
                cldImg={cld
                  .image(user.avatar)
                  .resize(fill().width(50).height(50))}
              />
            </Box>
            <Button onClick={handleLogout} variant="contained" color="secondary">
              LOGOUT
            </Button>
            <Button onClick={() => navigate("/cardForm")} variant="contained" color="secondary">
              Add card
            </Button>
          </Box>
        ) : (
          <Box sx={button_box}>
            <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="contained" color="secondary" onClick={() => navigate("/register")}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
