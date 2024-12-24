"use client";
import { createTheme } from "@mui/material/styles";

const lightTheme = {
  palette: {
    primary: {
      main: "#bcb6ab"
    },
    secondary: {
      main: "#646974"
    },
    background: {
      default: "#f0e9dd",
      paper: "#fff8ed"
    }
  }
};

const darkTheme = {
  palette: {
    primary: {
      main: "#bcb6ab"
    },
    secondary: {
      main: "#323841"
    },
    background: {
      default: "#605a50",
      paper: "#1f1b13"
    }
  }
};

const theme = createTheme({
  colorSchemes: {
    light: lightTheme,
    dark: darkTheme
  },
  typography: {
    fontFamily: "var(--font-roboto)"
  }
});

export default theme;
