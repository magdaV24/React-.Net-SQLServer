import ExtensionSharpIcon from "@mui/icons-material/ExtensionSharp";
import { Fab } from "@mui/material";
import GameForm from "../game/GameForm";
import { fab_style_two } from "../styles/app";
import { useAppDispatch } from "../redux/store";
import { initGame } from "../redux/reducers/gameReducer";

export default function InitializeGameButton() {
  const dispatch = useAppDispatch();

  const openGameForm = () => {
    dispatch(initGame());
  };

  return (
    <>
      <Fab variant="extended" sx={fab_style_two} onClick={openGameForm}>
        <ExtensionSharpIcon sx={{ mr: 1 }} />
        Start game
      </Fab>
      <GameForm/>
    </>
  );
}
