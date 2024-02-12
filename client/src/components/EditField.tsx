import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEditFieldMutation, appApi } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";

interface EditField {
  fieldName: string;
  fieldValue: string;
  cardId: number;
}
export default function EditField({
  fieldName,
  fieldValue,
  cardId,
}: EditField) {
  const { control, getValues, setValue, handleSubmit } = useForm();
  const [editField, { isLoading }] = useEditFieldMutation();
  const dispatch = useAppDispatch();
  const submitEditField = () => {
    const input = {
      id: cardId,
      field: fieldName,
      value: getValues(`${fieldName}`),
    };
    editField(input);
    dispatch(appApi.util.invalidateTags(["Card"]));
  };
  return (
    <Box>
      <Typography sx={{pb: 1, pt: 1}}>Edit {fieldName}</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => (
            <TextField
              sx={{ width: "90%", backgroundColor: "secondary.main" }}
              autoFocus
              {...field}
              defaultValue={fieldValue}
              onChange={(e) => setValue(fieldName, e.target.value)}
            />
          )}
        />

        {isLoading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit(() => submitEditField())}
            sx={{ height: "7vh" }}
          >
            <PublishSharpIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
}
