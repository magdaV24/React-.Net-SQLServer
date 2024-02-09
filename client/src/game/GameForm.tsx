import { Box, Modal } from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { modal } from "../styles/app";
import { game_form } from "../styles/gameForm";
import SetCategory from "./SetCategory";
import SetLimit from "./SetLimit";
import { closeInitGame } from "../redux/reducers/gameReducer";

export default function GameForm() {
  const gameInit = useAppSelector((state: RootState) => state.gameReducer.gameInit)
  const dispatch = useAppDispatch();

  return (
    <Modal open={gameInit} onClose={() => dispatch(closeInitGame())} sx={modal}>
      <Box sx={game_form}>
        <SetCategory />
        <SetLimit />
      </Box>
    </Modal>
  );
}
