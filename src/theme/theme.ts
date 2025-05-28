import { createTheme, type ThemeOptions } from "@mui/material/styles"
import type { ThemeMode } from "../types"

const getThemeOptions = (mode: ThemeMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#1976d2" : "#90caf9",
      light: mode === "light" ? "#42a5f5" : "#e3f2fd",
      dark: mode === "light" ? "#1565c0" : "#42a5f5",
    },
    secondary: {
      main: mode === "light" ? "#dc004e" : "#f48fb1",
    },
    background: {
      default: mode === "light" ? "#fafafa" : "#121212",
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "#212121" : "#ffffff",
      secondary: mode === "light" ? "#757575" : "#b0b0b0",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: 12,
          "&:hover": {
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
})

export const createAppTheme = (mode: ThemeMode) => createTheme(getThemeOptions(mode))
