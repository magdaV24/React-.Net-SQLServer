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
  styled,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useAddCardMutation } from "../redux/api/appApi";
import AddCardSharpIcon from "@mui/icons-material/AddCardSharp";
import { setError } from "../redux/reducers/errorReducer";
import { setMessage } from "../redux/reducers/messageReducer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { page_wrapper } from "../styles/app";
import Bar from "../components/Bar";
import useCloudinary from "../hooks/useCloudinaryMutation";
import { PRESET } from "../utils/cloudinary";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CardsForm() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
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

  const submit_to_cloudinary = useCloudinary();
  const checkIfCardHasPhotos = (
    a: 0 | 1 | undefined,
    b: 0 | 1 | undefined,
    c: 0 | 1 | undefined,
    d: 0 | 1 | undefined
  ) => {
    if (
      a === (undefined || 0) &&
      b === (undefined || 0) &&
      c === (undefined || 0) &&
      d === (undefined || 0)
    ) {
      return 0;
    }
    return 1;
  };

  const submitPhoto = async (field: string) => {
    const temp = getValues(field);
    if (temp === undefined) {
      setValue(field, " ");
      return 0;
    }
    const formData = new FormData();

    formData.append("file", temp[0]);
    formData.append("upload_preset", PRESET);

    try {
      await submit_to_cloudinary(formData).then((res) => setValue(field, res));
      return 1;
    } catch (error) {
      dispatch(setError(`Error submitting ${field}: ${error}`));
    }
  };
  const onSubmit = async () => {
    const userId = user?.id;
    const checkOne = await submitPhoto("answerPhoto");
    const checkTwo = await submitPhoto("wrongAnswerOnePhoto");
    const checkThree = await submitPhoto("wrongAnswerTwoPhoto");
    const checkFour = await submitPhoto("wrongAnswerThreePhoto");

    const check = checkIfCardHasPhotos(
      checkFour,
      checkThree,
      checkTwo,
      checkOne
    );

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
        hasPhotos: check,
      };

      if (check === 0) {
        await addCard(input);
        dispatch(setMessage("Card added successfully!"));
        reset();
      } else {
        const newInput = {
          ...input,
          answerPhoto: getValues("answerPhoto"),
          wrongAnswerOnePhoto: getValues("wrongAnswerOnePhoto"),
          wrongAnswerTwoPhoto: getValues("wrongAnswerTwoPhoto"),
          wrongAnswerThreePhoto: getValues("wrongAnswerThreePhoto"),
        };
        await addCard(newInput);
        dispatch(setMessage("Card added successfully!"));
        reset();
      }
    } catch (error) {
      dispatch(setError(`Error while trying to submit the card: ${error}`));
    }
  };

  useEffect(() => {
    if (errors.category) {
      dispatch(setError(`Category error: ${errors.category.message}`));
    }
    if (errors.question) {
      dispatch(setError(`Question error: ${errors.question.message}`));
    }
    if (errors.answer || errors.answerPhoto) {
      dispatch(
        setError("Provide a correct answer! As text, as an image or both!")
      );
    }
    if (
      errors.wrongAnswerOne ||
      errors.wrongAnswerTwo ||
      errors.wrongAnswerThree ||
      errors.wrongAnswerOnePhoto ||
      errors.wrongAnswerTwoPhoto ||
      errors.wrongAnswerThreePhoto
    ) {
      dispatch(
        setError(
          "Three incorrect answers are required! As text, as photos or as both!"
        )
      );
    }
  }, [
    dispatch,
    errors.answer,
    errors.answerPhoto,
    errors.category,
    errors.question,
    errors.wrongAnswerOne,
    errors.wrongAnswerOnePhoto,
    errors.wrongAnswerThree,
    errors.wrongAnswerThreePhoto,
    errors.wrongAnswerTwo,
    errors.wrongAnswerTwoPhoto,
    isSuccess,
    reset,
    user,
  ]);
  return (
    <Container sx={page_wrapper}>
      <Bar />
      <Card
        sx={{ display: "flex", flexDirection: "column", p: 2, width: "40vw" }}
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
                message: "Category field is required!",
              },
              validate: (value: string) => value !== "" || false,
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
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Question required!",
              },
              validate: (value: string) => value !== "" || false,
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="answer"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  if (value === "" && getValues("answerPhoto") === undefined) {
                    return false;
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  id="correct-answer-standard-basic"
                  label="Correct Answer"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="answerPhoto"
              control={control}
              render={({ field }) => (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </Button>
              )}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="wrongAnswerOne"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  if (value === "" && getValues("wrongAnswerOnePhoto") === undefined) {
                    return false;
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  id="wrong-answer-one-standard-basic"
                  label="Wrong Answer One"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="wrongAnswerOnePhoto"
              control={control}
              render={({ field }) => (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </Button>
              )}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="wrongAnswerTwo"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  if (value === "" && getValues("wrongAnswerTwoPhoto") === undefined) {
                    return false;
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  id="wrong-answer-two-standard-basic"
                  label="Wrong Answer Two"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="wrongAnswerTwoPhoto"
              control={control}
              render={({ field }) => (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </Button>
              )}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="wrongAnswerThree"
              control={control}
              rules={{
                validate: (value) => {
                  if (value === undefined && getValues("wrongAnswerThreePhoto") === undefined) {
                    return false;
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  id="wrong-answer-three-standard-basic"
                  label="Wrong Answer Three"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="wrongAnswerThreePhoto"
              control={control}
              render={({ field }) => (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </Button>
              )}
            />
          </Box>
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
              variant="contained"
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
