import {
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Card as CardType } from "../types/CardType";
import { useMemo, useState } from "react";
import { increment } from "../redux/reducers/gameReducer";
import { useAppDispatch } from "../redux/store";

interface Card {
  card: CardType;
}

export default function CardComponent({ card }: Card) {
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
  const [disabled, setDisabled] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
    <Box sx={{ backgroundColor: `${background}` }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.category}
        </Typography>
        <Typography variant="h5" component="div">
          {card.question}
        </Typography>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value={options[i[0]]}
            control={<Radio />}
            label={options[i[0]]}
            disabled={disabled}
          />
          <FormControlLabel
            value={options[i[1]]}
            control={<Radio />}
            disabled={disabled}
            label={options[i[1]]}
          />
          <FormControlLabel
            value={options[i[2]]}
            disabled={disabled}
            control={<Radio />}
            label={options[i[2]]}
          />
          <FormControlLabel
            value={options[i[3]]}
            control={<Radio />}
            disabled={disabled}
            label={options[i[3]]}
          />
        </RadioGroup>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="outlined" onClick={(e) => onSubmit(e)}>
          Submit answer
        </Button>
      </CardActions>
    </Box>
  );
}
