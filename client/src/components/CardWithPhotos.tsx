import {
  Box,
  CardContent,
  Typography,
  Grid,
  FormControlLabel,
  Radio,
  CardActions,
  Button,
} from "@mui/material";
import { useMemo, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { increment } from "../redux/reducers/gameReducer";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { Card as CardType } from "../types/CardType";
import { cloudinaryFnc } from "../utils/cloudinaryFnc";
import {
  card_wrapper,
  grid_container,
  option,
  photo_container,
  radio_box,
} from "../styles/cardWithPhoto";
interface Card {
  card: CardType;
  count: number;
}

type Options = {
  answer: string;
  photo: string;
};
export default function CardWithPhotos({ card, count }: Card) {
  const cld = cloudinaryFnc();

  const limit = useAppSelector((state: RootState) => state.cardReducer.limit);
  const options: Options[] = [
    { answer: card.answer, photo: card.answerPhoto },
    { answer: card.wrongAnswerOne, photo: card.wrongAnswerOnePhoto },
    { answer: card.wrongAnswerTwo, photo: card.wrongAnswerTwoPhoto },
    { answer: card.wrongAnswerThree, photo: card.wrongAnswerThreePhoto },
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
  const [selectedAnswer, setSelectedAnswer] = useState<Options>({
    answer: "",
    photo: "",
  });

  const [background, setBackground] = useState("background.paper");
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleValueChange = (value: string, photo: string) => {
    setValue(value);
    setPhoto(photo);
    const input: Options = { answer: value, photo: photo };
    setSelectedAnswer(input);
  };

  const onSubmit = (e: unknown) => {
    (e as Event).preventDefault();
    if (value === card.answer && photo === card.answerPhoto) {
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
        <Grid container sx={grid_container}>
          {[0, 1, 2, 3].map((index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ ...option, backgroundColor: background }}>
                {(options[i[index]].photo).trim() && (
                  <Box sx={photo_container}>
                    <AdvancedImage
                      cldImg={cld
                        .image(options[i[index]].photo)
                        .resize(fill().height(150))}
                    />
                  </Box>
                )}
                <FormControlLabel
                  value={options[i[index]].answer}
                  control={<Radio />}
                  label={options[i[index]].answer}
                  disabled={disabled}
                  checked={
                    selectedAnswer.answer === options[i[index]].answer &&
                    selectedAnswer.photo === options[i[index]].photo
                  }
                  onChange={() =>
                    handleValueChange(
                      options[i[index]].answer,
                      options[i[index]].photo
                    )
                  }
                  sx={radio_box}
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
