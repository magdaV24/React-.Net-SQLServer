import {
  Box,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "../redux/store";
import { card_wrapper, card_box } from "../styles/card";
import { Card } from "../types/CardType";
import { useDeleteCardMutation, appApi } from "../redux/api/appApi";
import { setCard, setEdit } from "../redux/reducers/cardReducer";

interface Props {
  card: Card;
}

export default function UserCard({ card }: Props) {
  const options = [
    card.answer,
    card.wrongAnswerOne,
    card.wrongAnswerTwo,
    card.wrongAnswerThree,
  ];
  const i = [0, 1, 2, 3];

  const dispatch = useAppDispatch();

  const [deleteCard, { isLoading: deleteLoading }] = useDeleteCardMutation();

  const submitDelete = () => {
    deleteCard(card.id);
    dispatch(appApi.util.resetApiState());
  };
  const handleEdit=()=>{
    dispatch(setEdit(true))
    dispatch(setCard(card))
  }
  return (
    <Box sx={{ ...card_wrapper, background: "background.paper" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.category}
        </Typography>
        <Typography variant="h5" component="div" sx={{ mt: 1, mb: 1 }}>
          {card.question}
        </Typography>
        <Grid
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          {[0, 1, 2, 3].map((index) => (
            <Grid item xs={6} key={index}>
              <Box sx={card_box}>
                <Typography>{options[i[index]]}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ p: 2, display: "flex", gap: 2 }}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="info"
          onClick={handleEdit}
        >
          Edit Card
        </Button>
        {deleteLoading ? (
          <Button
            color="error"
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
          >
            <CircularProgress />
          </Button>
        ) : (
          <Button
            color="error"
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
            onClick={submitDelete}
          >
            Delete card
          </Button>
        )}
      </CardActions>
    </Box>
  );
}
