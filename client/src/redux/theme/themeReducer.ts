import {
  GET_THEME,
  SET_DARK_THEME,
  SET_LIGHT_THEME,
  ThemeAction,
} from "../actions/themeActionType";

export type ThemeState = {
  themeType: "dark" | "light";
};

const initialState: ThemeState = {
  themeType: "dark",
};

export function setDarkTheme(){
  return{
    type: SET_DARK_THEME,
    payload: 'dark',
  }
}

export function setLightTheme(){
  return{
    type: SET_LIGHT_THEME,
    payload: 'light',
  }
}

export function getTheme(){ //will be used in App.tsx in order to ensure that the theme persists even if the page is reloaded
  const currentTheme = localStorage.getItem("Theme")
  return{
    type: GET_THEME,
    payload: currentTheme,
  }
}

const themeReducer = (
  state = initialState,
  action: ThemeAction
) => {
  switch (action.type) {
    case SET_DARK_THEME:
      return {
        ...state,
        themeType: action.payload,
      };
    case SET_LIGHT_THEME:
      return {
        ...state,
        themeType: action.payload,
      };
    case GET_THEME:
      return{
        ...state,
        themeType: action.payload
      }
    default:
      return state;
  }
};

export default themeReducer;
