import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import {alpha, ThemeProvider} from "@mui/material/styles";
import { DarkTheme, LightTheme } from "@refinedev/mui";
import {indigo, neutral} from "./colors";
import {overridedLightTheme} from "./myLightTheme";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const overridedDarkTheme = {
  ...DarkTheme,
  palette: {
    ...DarkTheme.palette,
    // primary: {
    //   main: "#1976d2",
    //   contrastText: "#fff",
    // },
    primary: indigo,
    secondary: {
      main: "#1C2536",
      contrastText: "#fff",
    },
    background: {
      default: '#000',
      paper: '#000'
    },
    // background: {
    //   default: "#545457",
    //   paper: "#1C2536",
    // },
    success: {
      main: "#67be23",
      contrastText: "#fff",
    },
    error: {
      main: "#ee2a1e",
      contrastText: "#fff",
    },
    warning: {
      main: "#fa8c16",
      contrastText: "#fff",
    },
    info: {
      main: "#1890ff",
      contrastText: "#fff",
    },
    divider: "rgba(72,72,72,0)",
    text: {
      primary: neutral[100],
      secondary: neutral[400],
      disabled: alpha(neutral[100], 0.38)
    },
    // text: {
    //   primary: "#fff",
    //   secondary: "rgba(255,255,255,0.7)",
    //   disabled: "#d1d1d1",
    // },
  }
}



export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };



  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider theme={mode === "light" ? overridedLightTheme : overridedDarkTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
