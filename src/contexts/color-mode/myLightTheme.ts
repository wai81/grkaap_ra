import {LightTheme} from "@refinedev/mui";
import {indigo, neutral, success} from "./colors";
import {common} from "@mui/material/colors";
import {alpha} from "@mui/material/styles";

export const overridedLightTheme = {
    ...LightTheme,
    palette:{
        ...LightTheme.palette,
        primary: indigo,
        // primary:{
        //   main: "#1976d2",
        //   contrastText: "#fff",
        // },
        secondary: {
            main: "#1C2536",
            contrastText: "#fff",
        },
        background: {
            default: common.white,
            paper: common.white
        },
        success: {
            main: '#10B981', //"#67be23",
            contrastText: '#FFFFFF'
        },
        error: {
            main: '#F04438',//main: "#fa541c",
            contrastText: '#FFFFFF'
        },
        warning: {
            main: '#F79009',//main: "#fa8c16",
            contrastText: '#FFFFFF'
        },
        info: {
            main: '#06AED4',//main: "#0b82f0",
            contrastText: '#FFFFFF'
        },
        divider: 'rgba(0,0,0,0)',
        //divider: '#F2F4F7',
        // text: {
        //     primary: "#626262",
        //     secondary: "#9f9f9f",
        //     disabled: "#c1c1c1",
        // },
        text: {
            primary: neutral[900],
            secondary: neutral[500],
            disabled: alpha(neutral[900], 0.38)
        },
    }
}