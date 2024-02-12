import { Box, Modal, Typography } from "@mui/material";
import { RootState, useAppSelector } from "../redux/store";
import { modal } from "../styles/app";
import { finish_game_box } from "../styles/finishGame";

interface Props {
  open: boolean;
  closeModal: () => void;
}

export default function FinishGame({ open, closeModal }: Props) {
  const { points, limit } = useAppSelector((state: RootState) => ({
    points: state.gameReducer.points,
    limit: state.cardReducer.limit,
  }));

  const score = Number(((100 * points) / Number(limit)).toFixed(2));

  let message = "";
  let source = "";

  if (open) {
    if (score >= 80) {
      message = `Congratulations! You scored ${score}% !`;
      source = `/photos/picture_two.jpg`;
    } else if (score < 80 && score > 50) {
      message = `Good job! You scored ${score}%!`;
      source = `/photos/picture_one.jpg`;
    } else {
      message = `Keep going! This time you scored ${score}%.`;
      source = `/photos/picture_three.jpg`;
    }
  }

  return (
    <Modal open={open} onClose={closeModal} sx={modal}>
      <Box sx={finish_game_box}>
        <Box>
          <img
            src={source}
            alt="finish_game_picture"
            loading="lazy"
            style={{ width: "40vw", height: '50vh' }}
          />
        </Box>
        <Box>
          <Typography>{message}</Typography>
        </Box>
      </Box>
    </Modal>
  );
}