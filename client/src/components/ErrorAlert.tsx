import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { clearError } from "../redux/reducers/errorReducer";
import { alert_typography, error_alert } from "../styles/app";

export default function ErrorAlert() {
  const error = useAppSelector((state: RootState) => state.errorReducer.error);
  const openError = useAppSelector(
    (state: RootState) => state.errorReducer.openError
  );
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(clearError());
  };
  return (
    <Backdrop open={openError} sx={{ zIndex: 2 }}>
      <Card sx={error_alert}>
        <CardContent>
          <Typography variant="h5" component="div">
            Error
          </Typography>
          <Divider />
          <Typography variant="body2" sx={alert_typography}>
            {error}
          </Typography>
          <Divider />
        </CardContent>
        <CardActions>
          <Button size="medium" variant="contained" onClick={close}>
            Close
          </Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
