import {
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { Card as CardType } from "../types/CardType";
import { useMemo, useState } from "react";
import { increment } from "../redux/reducers/gameReducer";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { card_box, card_wrapper } from "../styles/card";

interface Card {
  card: CardType;
  count: number;
}

export default function CardComponent({ card, count }: Card) {
  const limit = useAppSelector((state: RootState) => state.cardReducer.limit);
  const options = [
    card.answer,
    card.wrongAnswerOne,
    card.wrongAnswerTwo,
    card.wrongAnswerThree,
  ];

  const dispatch = useAppDispatch();
  const index = useMemo(() => [0, 1, 2, 3], []);

  const shuffle = (array: Array<number>) => {
    let x = array.length;
    let random;

    while (x !== 0) {
      random = Math.floor(Math.random() * x);
      x -= 1;

      [array[x], array[random]] = [array[random], array[x]];
    }

    return array;
  };

  const i = useMemo(() => shuffle(index), [index]);

  const [background, setBackground] = useState("background.paper");
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleValueChange = (value: string) => {
    setValue(value);
    setChecked(value)
  };

  const onSubmit = (e: unknown) => {
    (e as Event).preventDefault();
    if (value === card.answer) {
      dispatch(increment(1));
      setBackground("success.dark");
    } else {
      setBackground("error.main");
    }
    setDisabled(true);
  };

  return (
    <Box sx={{ ...card_wrapper, backgroundColor: background }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.category} - Question {count}/{limit}
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
          {[0, 1, 2, 3].map((x) => (
            <Grid item xs={6} key={x}>
              <Box sx={{ ...card_box, backgroundColor: background }}>
                <FormControlLabel
                  value={options[i[x]]}
                  control={<Radio />}
                  label={options[i[x]]}
                  disabled={disabled}
                  checked={checked === options[i[x]]}
                  onChange={() =>
                    handleValueChange(options[i[x]])
                  }
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button size="large" variant="contained" onClick={(e) => onSubmit(e)}>
          Submit answer
        </Button>
      </CardActions>
    </Box>
  );
}
