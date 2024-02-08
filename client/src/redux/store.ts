import { ThunkMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeReducer";
import userSlice from "./reducers/userReducer";
import { appApi } from "./api/appApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import errorReducer from "./reducers/errorReducer";
import messageReducer from "./reducers/messageReducer";
import gameReducer from "./reducers/gameReducer";
import cardReducer from "./reducers/cardReducer";

const reducers = combineReducers({
  themeReducer: themeReducer,
  userReducer: userSlice,
  gameReducer: gameReducer,
  appApi: appApi.reducer,
  cardReducer: cardReducer,
  errorReducer: errorReducer,
  messageReducer: messageReducer,
});
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const customMiddleware = appApi.middleware as ThunkMiddleware;
    return getDefaultMiddleware().concat(customMiddleware);
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
