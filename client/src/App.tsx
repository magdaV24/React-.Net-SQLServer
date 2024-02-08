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
import { getToken, getUser } from "./redux/reducers/userReducer";

function App() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state: RootState) => state.userReducer)
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
    if(!token){
      dispatch(getToken())
    }
  },[dispatch, token, user])
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
    </CssBaseline>
  );
}

export default App;