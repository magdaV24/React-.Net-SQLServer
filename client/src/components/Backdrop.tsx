import MyBackdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
interface Props{
    open: boolean;
}
export default function Backdrop({open}: Props) {

  return (
    <>
      {open && (
        <MyBackdrop
          open={open}
        >
          <CircularProgress color="inherit" />
        </MyBackdrop>
      )}
    </>
  );
}