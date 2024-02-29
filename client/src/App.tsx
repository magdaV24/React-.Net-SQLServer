import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import ThemeButton from "./components/ThemeButton";
import ErrorAlert from "./components/ErrorAlert";
import SuccessAlert from "./components/SuccessAlert";
import CardsForm from "./forms/CardsForm";
import Game from "./game/Game";
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import { getToken, setUser } from "./redux/reducers/userReducer";
import Backdrop from "./components/Backdrop";
import { getTheme } from "./redux/theme/themeReducer";
import useCheckToken from "./hooks/useCheckToken";
import useToken from "./hooks/useToken";

function App() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state: RootState) => state.userReducer)
  const checkToken = useCheckToken()
  const currentUser = useToken();
  useEffect(() => {
    dispatch(getTheme()) 
    if (!user) {
      dispatch(setUser(currentUser));
    }
    if(!token){
      dispatch(getToken())
    }
    checkToken(token);
  },[dispatch, token, user, checkToken, currentUser])
  return (
    <CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home/:username" element={<UserPage />} />
          <Route path="/cardForm" element={<CardsForm />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
      <ErrorAlert/>
      <SuccessAlert/>
      <ThemeButton />
      <Backdrop />
    </CssBaseline>
  );
}

export default App;