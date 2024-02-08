import {
  Box,
  Button,
  Container,
  Typography,
  Card as Wrapper,
} from "@mui/material";
import { page_wrapper } from "../styles/app";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { game_box } from "../styles/game";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import useCards from "../hooks/useCards";
import CardComponent from "../components/Card";
import FinishGame from "../components/FinishGame";
import { useState } from "react";
import { Card } from "../types/CardType";
import { closeInitGame, reset } from "../redux/reducers/gameReducer";
import { resetCardState } from "../redux/reducers/cardReducer";
import { useNavigate } from "react-router-dom";
import { card_wrapper, cards_wrapper } from "../styles/card";

export default function Game() {
  const { category, limit } = useAppSelector(
    (state: RootState) => state.cardReducer
  );

  const data = useCards(category! as string, limit);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
    dispatch(reset());
    dispatch(resetCardState());
    navigate("/dashboard");
  };

  const closeGame = () => {
    dispatch(reset());
    dispatch(resetCardState());
    navigate("/dashboard");
  };

  return (
    <Container sx={page_wrapper}>
      <Box sx={game_box}>
        <Box sx={closeInitGame}>
          <Button variant="contained" color="error" onClick={closeGame}>
            <CloseSharpIcon />
          </Button>
        </Box>
        <Box sx={cards_wrapper}>
          {data &&
            data.map((card: Card, index: number) => (
              <Wrapper key={index} sx={card_wrapper}>
                <Typography>
                  Question {index + 1}/{data.length}
                </Typography>
                <CardComponent card={card} key={card.id} />
              </Wrapper>
            ))}
        </Box>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="info"
          size="large"
        >
          Finish quiz
        </Button>
        <FinishGame open={openModal} closeModal={closeModal} />
      </Box>
    </Container>
  );
}
