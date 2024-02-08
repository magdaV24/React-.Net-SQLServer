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

export default function SuccessAlert() {
  const error = useAppSelector(
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
      <Card
        sx={{
          backgroundColor: "success.main",
          width: "30vw",
          minHeight: "20vh",
          height: "fit-content",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Message
          </Typography>
          <Divider />
          <Typography
            variant="body2"
            sx={{ minHeight: "10vh", height: "fit-content", mt: 2 }}
          >
            {error}
          </Typography>
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
