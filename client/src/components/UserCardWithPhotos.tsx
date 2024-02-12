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
import { card_wrapper } from "../styles/card";
import {
  grid_container,
  option,
  photo_container,
} from "../styles/cardWithPhoto";
import { Card } from "../types/CardType";
import { cloudinaryFnc } from "../utils/cloudinaryFnc";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { setCard, setEdit } from "../redux/reducers/cardReducer";
import { appApi, useDeleteCardMutation } from "../redux/api/appApi";

interface Props {
  card: Card;
}

type Options = {
  answer: string;
  photo: string;
};

export default function UserCardWithPhotos({ card }: Props) {
  const cld = cloudinaryFnc();
  const options: Options[] = [
    { answer: card.answer, photo: card.answerPhoto },
    { answer: card.wrongAnswerOne, photo: card.wrongAnswerOnePhoto },
    { answer: card.wrongAnswerTwo, photo: card.wrongAnswerTwoPhoto },
    { answer: card.wrongAnswerThree, photo: card.wrongAnswerThreePhoto },
  ];
  const i = [0, 1, 2, 3];
  const dispatch = useAppDispatch();
  const [deleteCard, { isLoading: deleteLoading }] = useDeleteCardMutation();

  const handleEdit=()=>{
    dispatch(setEdit(true))
    dispatch(setCard(card))
  }
  const submitDelete = () => {
    deleteCard(card.id);
    dispatch(appApi.util.resetApiState());
  };
  return (
    <Box sx={{ ...card_wrapper, backgroundColor: "background.paper" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.category}
        </Typography>
        <Typography variant="h5" component="div" sx={{ mt: 1, mb: 1 }}>
          {card.question}
        </Typography>
        <Grid container sx={grid_container}>
          {[0, 1, 2, 3].map((index) => (
            <Grid item xs={6} key={index}>
              <Box sx={option}>
                {(options[i[index]].photo).trim() && (
                  <Box sx={photo_container}>
                    <AdvancedImage
                      cldImg={cld
                        .image(options[i[index]].photo)
                        .resize(fill().height(150))}
                    />
                  </Box>
                )}
                <Typography>{options[i[index]].answer}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ p: 2, display: 'flex', gap: 2 }}>
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
