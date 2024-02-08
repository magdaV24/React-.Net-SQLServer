import { ThemeOptions, createTheme } from "@mui/material";
import { DarkTheme } from "../redux/theme/themes/Dark";
import { LightTheme } from "../redux/theme/themes/Light";

export const getTheme = (themeType: "light" | "dark"): ThemeOptions => {
  return createTheme(themeType === "light" ? LightTheme : DarkTheme);
};
