import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/UserType";

interface UserState {
  user: User | null;
  loading: boolean;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("Token")
    },
    isLoading: (state) => {
      state.loading = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("Token", JSON.stringify(action.payload))
    },
    getToken:  (state) =>{
      const token = localStorage.getItem("Token");
      state.token = JSON.parse(token!);
    },
  },
});

export const { setUser, clearUser, isLoading, setToken, getToken } = userSlice.actions;

export default userSlice.reducer;
