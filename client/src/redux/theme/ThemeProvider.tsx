import { FC } from "react";
import { getTheme } from "../../utils/themes";
import { ThemeProvider as Theme } from "@emotion/react";
import { RootState, useAppSelector } from "../store";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: FC<Props> = ({ children }) => {
  const theme = useAppSelector((state: RootState) => state.themeReducer.themeType) as "dark" | "light";
  const currentTheme = getTheme(theme);
  
  return <Theme theme={currentTheme}>{children}</Theme>;
};

export default ThemeProvider;