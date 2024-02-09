export const SET_DARK_THEME = 'SET_DARK_THEME';
export const SET_LIGHT_THEME = 'SET_LIGHT_THEME';
export const GET_THEME = 'GET_THEME';

export type SetDarkThemeAction = {
    type: typeof SET_DARK_THEME;
    payload: 'dark'
}

export type SetLightThemeAction = {
    type: typeof SET_LIGHT_THEME;
    payload: 'light'
}

export type GetThemeAction = {
    type: typeof GET_THEME;
    payload: 'light' | "dark"
}

export type ThemeAction = SetDarkThemeAction | SetLightThemeAction | GetThemeAction