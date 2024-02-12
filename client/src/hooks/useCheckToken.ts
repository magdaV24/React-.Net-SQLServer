import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../redux/store";
import { clearUser } from "../redux/reducers/userReducer";

export default function useCheckToken() {
  const dispatch = useAppDispatch();
  const saveToken = (token: string) => {
    const decodedToken = jwtDecode(token);
    const expiration = decodedToken.exp! * 1000;
    const newToken = { decodedToken, expiration };
    return newToken;
  };

  const checkToken = (token: string | null) => {
    if (token) {
      const decodedToken = saveToken(token);
      const currentTime = Date.now();
      if (currentTime > decodedToken.expiration) {
        dispatch(clearUser());
      }
    } else {
      return;
    }
  };
  return checkToken;
}
