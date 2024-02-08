export const DARK_THEME = 'DARK_THEME';
export const LIGHT_THEME = 'LIGHT_THEME';

export type DarkThemeAction = {
    type: typeof DARK_THEME;
    payload: number
}

export type LightThemeAction = {
    type: typeof LIGHT_THEME;
    payload: number
}

export type ThemeAction = DarkThemeAction | LightThemeAction