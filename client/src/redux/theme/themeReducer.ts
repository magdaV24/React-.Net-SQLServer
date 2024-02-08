import {
  DARK_THEME,
  LIGHT_THEME,
  ThemeAction,
} from "../actions/themeActionType";

export type ThemeState = {
  themeType: "dark" | "light";
};

const initialState: ThemeState = {
  themeType: "dark",
};

const themeReducer = (
  state = initialState,
  action: ThemeAction
) => {
  switch (action.type) {
    case DARK_THEME:
      return {
        ...state,
        themeType: "dark",
      };
    case LIGHT_THEME:
      return {
        ...state,
        themeType: "light",
      };
    default:
      return state;
  }
};

export default themeReducer;
