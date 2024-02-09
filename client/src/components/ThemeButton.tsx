import { Fab } from "@mui/material";
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { fab_style } from "../styles/app";
import { setDarkTheme, setLightTheme } from "../redux/theme/themeReducer";

export default function ThemeButton(){

    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector((state: RootState) => state.themeReducer.themeType)

    const toggleTheme = () => {
        if(currentTheme === 'light'){
            dispatch(setDarkTheme())
            localStorage.setItem("Theme", "dark")
        } else{
            dispatch(setLightTheme())
            localStorage.setItem("Theme", "light")
        }
    }

    return(
        <Fab color="primary" variant="circular" sx={fab_style} onClick={toggleTheme}>
            <PaletteOutlinedIcon sx={{fontSize: "2rem"}}/>
        </Fab>
    )
}