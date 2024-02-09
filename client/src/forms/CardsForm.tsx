import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  CardHeader,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useAddCardMutation } from "../redux/api/appApi";
import AddCardSharpIcon from "@mui/icons-material/AddCardSharp";
import { setError } from "../redux/reducers/errorReducer";
import { setMessage } from "../redux/reducers/messageReducer";
import { page_wrapper } from "../styles/app";
import Bar from "../components/Bar";


export default function CardsForm() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);

  const handlePublic = (input: boolean) => {
    if (input === true) {
      return 1;
    } else {
      return 0;
    }
  };
  const [addCard, { isLoading, isSuccess }] = useAddCardMutation();

  const onSubmit = async () => {
    const userId = user?.id;
   try {
    const input = {
      category: getValues("category"),
      question: getValues("question"),
      answer: getValues("answer"),
      wrongAnswerOne: getValues("wrongAnswerOne"),
      wrongAnswerTwo: getValues("wrongAnswerTwo"),
      wrongAnswerThree: getValues("wrongAnswerThree"),
      userId: userId,
      public: handlePublic(getValues("public")),
      check: getValues("public"),
    };
    await addCard(input);
    dispatch(setMessage("Card added successfully!"));
    reset()
   } catch (error) {
    dispatch(setError(`Log in error: ${error}`));
   }
  };
  const isNotEmpty = (value: string) => value.trim() !== "";

  useEffect(() => {
    if (errors.category) {
      dispatch(setError(`Category error: ${errors.category.message}`));
    }
    if (errors.question) {
      dispatch(setError(`Question error: ${errors.question.message}`));
    }
    if (errors.answer) {
      dispatch(setError(`Question error: ${errors.answer.message}`));
    }
    if (
      errors.wrongAnswerOne ||
      errors.wrongAnswerTwo ||
      errors.wrongAnswerThree
    ) {
      dispatch(setError("Three incorrect answers are required!"));
    }
  }, [
    dispatch,
    errors.answer,
    errors.category,
    errors.question,
    errors.wrongAnswerOne,
    errors.wrongAnswerThree,
    errors.wrongAnswerTwo,
    isSuccess,
    reset,
    user,
  ]);
  return (
    <Container sx={page_wrapper}>
      <Bar/>
      <Card
        sx={{ display: "flex", flexDirection: "column", p: 2, width: "30vw" }}
      >
        <CardHeader
          avatar={
            <AddCardSharpIcon color="primary" sx={{ fontSize: "3.5rem" }} />
          }
          title={
            <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
              Add Card
            </Typography>
          }
        />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Controller
            name="category"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Category required!",
              },
              validate: (value: string) =>
                isNotEmpty(value) || "Category cannot be empty!",
            }}
            render={({ field }) => (
              <TextField
                id="category-standard-basic"
                label="Category"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="question"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Question required!",
              },
              validate: (value: string) =>
                isNotEmpty(value) || "Question cannot be empty!",
            }}
            render={({ field }) => (
              <TextField
                id="question-standard-basic"
                label="Question"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="answer"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Correct answer is required!",
              },
              validate: (value: string) =>
                isNotEmpty(value) || "Provide the correct answer!",
            }}
            render={({ field }) => (
              <TextField
                id="correct-answer-standard-basic"
                label="Correct Answer"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="wrongAnswerOne"
            control={control}
            rules={{
              required: {
                value: true,
                message: "You did not provide three wrong answers!",
              },
              validate: (value: string) =>
                isNotEmpty(value) || "Provide three wrong answers!",
            }}
            render={({ field }) => (
              <TextField
                id="wrong-answer-one-standard-basic"
                label="Wrong Answer One"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="wrongAnswerTwo"
            control={control}
            rules={{
              required: {
                value: true,
                message: "You did not provide three wrong answers!",
              },
              validate: (value: string) =>
                isNotEmpty(value) || "Provide three wrong answers!",
            }}
            render={({ field }) => (
              <TextField
                id="wrong-answer-two-standard-basic"
                label="Wrong Answer Two"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="wrongAnswerThree"
            control={control}
            rules={{
              required: {
                value: true,
                message: "You did not provide three wrong answers!",
              },
              validate: (value: string) =>
                isNotEmpty(value) || "Provide three wrong answers!",
            }}
            render={({ field }) => (
              <TextField
                id="wrong-answer-three-standard-basic"
                label="Wrong Answer Three"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="public"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                label="Make this card public?"
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
              />
            )}
          />
          {isLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              size="large"
              onClick={handleSubmit(onSubmit)}
            >
              SUBMIT CARD
            </Button>
          )}
        </Container>
      </Card>
    </Container>
  );
}
