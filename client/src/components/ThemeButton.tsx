import { Fab } from "@mui/material";
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { DARK_THEME, DarkThemeAction, LIGHT_THEME, LightThemeAction } from "../redux/actions/themeActionType";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { fab_style } from "../styles/app";

export default function ThemeButton(){

    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector((state: RootState) => state.themeReducer.themeType)

    const toggleTheme = () => {
        if(currentTheme === 'light'){
            dispatch(({type: DARK_THEME}) as DarkThemeAction)
        } else{
            dispatch(({type: LIGHT_THEME}) as LightThemeAction)
        }
    }

    return(
        <Fab color="primary" variant="circular" sx={fab_style} onClick={toggleTheme}>
            <PaletteOutlinedIcon sx={{fontSize: "2rem"}}/>
        </Fab>
    )
}