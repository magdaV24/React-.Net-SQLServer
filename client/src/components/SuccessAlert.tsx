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
import { clearMessage } from "../redux/reducers/messageReducer";
import { alert_typography, success_alert } from "../styles/app";

export default function SuccessAlert() {
  const message = useAppSelector(
    (state: RootState) => state.messageReducer.message
  );
  const openMessage = useAppSelector(
    (state: RootState) => state.messageReducer.openMessage
  );
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(clearMessage());
  };
  return (
    <Backdrop open={openMessage} sx={{ zIndex: 2 }}>
      <Card sx={success_alert}>
        <CardContent>
          <Typography variant="h5" component="div">
            Message
          </Typography>
          <Divider />
          {typeof message === "string" ? (
            <Typography variant="body2" sx={alert_typography}>
              {message}
            </Typography>
          ) : (
            <>{message}</>
          )}
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small" variant="contained" onClick={close}>
            Close
          </Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
