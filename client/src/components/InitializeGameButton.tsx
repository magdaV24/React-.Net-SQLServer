import ExtensionSharpIcon from "@mui/icons-material/ExtensionSharp";
import { Fab, Typography } from "@mui/material";
import GameForm from "../game/GameForm";
import { alert_typography, fab_style_two } from "../styles/app";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { initGame } from "../redux/reducers/gameReducer";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../redux/reducers/messageReducer";

export default function InitializeGameButton() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.user);
  const openGameForm = () => {
    dispatch(initGame());
  };
  const navigate = useNavigate();
  const link = (
    <Typography onClick={() => navigate("/login")} sx={alert_typography}>
      You are not logged in! Click here to go to the login page.
    </Typography>
  ) as unknown as string | Element;
  const sendToLogin = () => {
    dispatch(setMessage(link));
  };
  return (
    <>
      {user ? (
        <Fab variant="extended" sx={fab_style_two} onClick={openGameForm}>
          <ExtensionSharpIcon sx={{ mr: 1 }} />
          Start game
        </Fab>
      ) : (
        <Fab variant="extended" sx={fab_style_two} onClick={sendToLogin}>
          <ExtensionSharpIcon sx={{ mr: 1 }} />
          Start game
        </Fab>
      )}
      <GameForm />
    </>
  );
}
