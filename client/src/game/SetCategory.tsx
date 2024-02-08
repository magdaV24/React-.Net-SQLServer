import { MenuItem, Box, Button, Select as List } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import useFetchSelect from "../hooks/useFetchSelect";
import { Select } from "../types/SelectType";
import { setCategory, setCount } from "../redux/reducers/cardReducer";

export default function SetCategory() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.user);

  const { control, handleSubmit, getValues } = useForm();

  const userId = user?.id;
  const { data } = useFetchSelect(userId!);

  const chooseCategory = () => {
    const newCategory = getValues("category");
    console.log(newCategory);
    dispatch(setCategory(newCategory));
  };

  return (
    <Box sx={{ display: "flex", gap: 2,}}>
      <Controller
        name="category"
        control={control}
        defaultValue={data ? data[0].category : ""}
        rules={{ required: "The category is required!" }}
        render={({ field }) => (
          <List {...field} labelId="category-select" label="Category">
            <MenuItem>
              <em>None</em>
            </MenuItem>
            {data &&
              data.map((item: Select) => (
                <MenuItem key={item.category} value={item.category} onClick={() => dispatch(setCount(item.count))}>
                  {item.category}
                </MenuItem>
              ))}
          </List>
        )}
      />
      <Button variant="contained" onClick={handleSubmit(chooseCategory)}>
        Choose Category
      </Button>
    </Box>
  );
}
