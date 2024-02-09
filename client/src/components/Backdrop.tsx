import MyBackdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { RootState, useAppSelector } from "../redux/store";

export default function Backdrop() {
 const loading = useAppSelector((state: RootState) => state.cardReducer.loading);
  return (
    <>
      {loading && (
        <MyBackdrop
          open={loading}
        >
          <CircularProgress color="inherit" />
        </MyBackdrop>
      )}
    </>
  );
}