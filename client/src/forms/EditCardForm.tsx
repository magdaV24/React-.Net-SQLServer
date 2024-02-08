import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Container,
  TextField,
  Box,
  CircularProgress,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card } from "../types/CardType";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";
import {
  appApi,
  useDeleteCardMutation,
  useEditFieldMutation,
  useEditPublicMutation,
} from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";

interface Props {
  card: Card;
}

export default function EditCardForm({ card }: Props) {
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [editing, setEditing] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const editingState = (i: number) => {
    const newEditing = [...editing];
    newEditing[i] = !newEditing[i];
    setEditing(newEditing);
  };
  const [editField, { isLoading }] = useEditFieldMutation();
  const [editPublic, { isLoading: publicLoading }] = useEditPublicMutation();
  const [deleteCard, { isLoading: deleteLoading }] = useDeleteCardMutation();

  const setPublic = (input: number) => {
    if (input === 0) {
      return false;
    } else {
      return true;
    }
  };

  const displayPublic = (input: number) => {
    if (input === 0) {
      return "Private";
    }
    return "Public";
  };

  const submitEditField = (field: string) => {
    const input = { id: card.id, field: field, value: getValues(`${field}`) };
    editField(input);
  };
  const submitEditPublic = (input: boolean) => {
    const edit = { id: card.id, value: getValues("Public") };
    if (input === false) {
      edit.value = 0;
    } else {
      edit.value = 1;
    }
    editPublic(edit);
  };

  const dispatch = useAppDispatch()
  const submitDelete = () => {
    deleteCard(card.id);
    dispatch(appApi.util.resetApiState())
  }
  return (
    <TableContainer
      sx={{
        display: "flex",
        minHeight: "60vh",
        height: "fit-content",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell sx={{ width: "10%", backgroundColor: "secondary.dark" }}>
              Category:
            </TableCell>
            <TableCell
              sx={{ width: "90%", backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(0)}
            >
              {editing[0] ? (
                <Container
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Controller
                    control={control}
                    name="Category"
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "90%", backgroundColor: "secondary.main" }}
                        autoFocus
                        {...field}
                        defaultValue={card?.category}
                        onChange={(e) => setValue("Category", e.target.value)}
                      />
                    )}
                  />

                  {isLoading ? (
                    <Box>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleSubmit(() => submitEditField("Category"))}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                card?.category
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell>Question:</TableCell>
            <TableCell
              sx={{ backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(1)}
            >
              {editing[1] ? (
                <Container
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Controller
                    control={control}
                    name="Question"
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        {...field}
                        defaultValue={card?.question}
                        onChange={(e) => setValue("Question", e.target.value)}
                      />
                    )}
                  />
                  {isLoading ? (
                    <Box>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleSubmit(() => submitEditField("Question"))}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                card?.question
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell>Answer:</TableCell>
            <TableCell
              sx={{ backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(2)}
            >
              {editing[2] ? (
                <Container
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Controller
                    control={control}
                    name="Answer"
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        {...field}
                        defaultValue={card?.answer}
                        onChange={(e) => setValue("Answer", e.target.value)}
                      />
                    )}
                  />
                  {isLoading ? (
                    <Box>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleSubmit(() => submitEditField("Answer"))}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                card?.answer
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell>Wrong Answer One:</TableCell>
            <TableCell
              sx={{ backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(3)}
            >
              {editing[3] ? (
                <Container
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Controller
                    control={control}
                    name="WrongAnswerOne"
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        {...field}
                        defaultValue={card?.wrongAnswerOne}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                  {isLoading ? (
                    <Box>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleSubmit(() =>
                        submitEditField("WrongAnswerOne")
                      )}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                card?.wrongAnswerOne
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell>Wrong Answer Two:</TableCell>
            <TableCell
              sx={{ backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(4)}
            >
              {editing[4] ? (
                <Container
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Controller
                    control={control}
                    name="WrongAnswerTwo"
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        {...field}
                        defaultValue={card?.wrongAnswerTwo}
                        onChange={(e) =>
                          setValue("WrongAnswerTwo", e.target.value)
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
                      variant="outlined"
                      onClick={handleSubmit(() =>
                        submitEditField("WrongAnswerTwo")
                      )}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                card?.wrongAnswerTwo
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell>Wrong Answer Three:</TableCell>
            <TableCell
              sx={{ backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(5)}
            >
              {editing[5] ? (
                <Container
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Controller
                    control={control}
                    name="WrongAnswerThree"
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        {...field}
                        defaultValue={card?.wrongAnswerThree}
                        onChange={(e) =>
                          setValue("WrongAnswerThree", e.target.value)
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
                      variant="outlined"
                      onClick={handleSubmit(() =>
                        submitEditField("WrongAnswerThree")
                      )}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                card?.wrongAnswerThree
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            <TableCell>Public:</TableCell>
            <TableCell
              sx={{ backgroundColor: "secondary.main" }}
              onDoubleClick={() => editingState(6)}
            >
              {editing[6] ? (
                <Container>
                  <Controller
                    name="Public"
                    control={control}
                    defaultValue={setPublic(card?.public)}
                    render={({ field }) => (
                      <FormControlLabel
                        label="Make this card public?"
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={() => setValue("Public", !field.value)}
                          />
                        }
                      />
                    )}
                  />
                  {publicLoading ? (
                    <Box>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleSubmit(() =>
                        submitEditPublic(getValues("Public"))
                      )}
                      sx={{ height: "7vh" }}
                    >
                      <PublishSharpIcon />
                    </Button>
                  )}
                </Container>
              ) : (
                displayPublic(card?.public)
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ align: "left", backgroundColor: "secondary.dark" }}>
            {deleteLoading ? (
              <Button>
                <CircularProgress />
              </Button>
            ) : (
              <Button
                color="error"
                variant="contained"
                onClick={submitDelete}
              >
                Delete card
              </Button>
            )}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
