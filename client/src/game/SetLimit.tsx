import { Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setLimit } from "../redux/reducers/cardReducer";

export default function SetLimit() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state: RootState) => state.cardReducer.count);

  const { control, handleSubmit, getValues } = useForm();
  const navigate = useNavigate()

  const onSubmit = () => {
    const newLimit = getValues("limit");
    dispatch(setLimit(newLimit));
    navigate('/game')
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Controller
        name="limit"
        control={control}
        defaultValue={1}
        rules={{
          required: "Limit required!",
        }}
        render={({ field }) => (
          <TextField
            id="limit-standard-basic"
            label="Limit"
            variant="outlined"
            autoFocus
            type="number"
            {...field}
            inputProps={{
              min: 1,
              step: 1,
              max: count,
            }}
          />
        )}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Start quiz
      </Button>
    </Box>
  );
}
