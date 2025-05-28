import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Store
import { useThemeStore } from "./store/themeStore";

// Contexts
import { ToastProvider } from "./contexts/ToastContext";

// Components
import AppLayout from "./components/layout/AppLayout";
import PostsManager from "./components/PostsManager";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";

// Constants
import { UI_CONFIG, NOTIFICATIONS, ROUTES } from "./constants";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const { mode } = useThemeStore();

  // Create theme based on mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: UI_CONFIG.COLORS.PRIMARY,
      },
      secondary: {
        main: UI_CONFIG.COLORS.SECONDARY,
      },
      success: {
        main: UI_CONFIG.COLORS.SUCCESS,
      },
      error: {
        main: UI_CONFIG.COLORS.ERROR,
      },
      warning: {
        main: UI_CONFIG.COLORS.WARNING,
      },
      info: {
        main: UI_CONFIG.COLORS.INFO,
      },
    },
    typography: {
      fontFamily: UI_CONFIG.TYPOGRAPHY.FONT_FAMILY,
      h1: {
        fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.BOLD,
      },
      h2: {
        fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD,
      },
      h3: {
        fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD,
      },
      h4: {
        fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
      },
      h5: {
        fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
      },
      h6: {
        fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
      },
    },
    shape: {
      borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
            boxShadow:
              mode === "dark"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
          },
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={NOTIFICATIONS.MAX_SNACK}
          anchorOrigin={NOTIFICATIONS.POSITION.BOTTOM_RIGHT}
          autoHideDuration={NOTIFICATIONS.DURATION.MEDIUM}
        >
          <ToastProvider>
            <Router>
              <AppLayout>
                <Routes>
                  <Route path={ROUTES.HOME} element={<PostsManager />} />
                  <Route path={ROUTES.CREATE} element={<PostForm />} />
                  <Route path="/edit/:id" element={<PostForm />} />
                  <Route path="/post/:id" element={<PostDetail />} />
                </Routes>
              </AppLayout>
            </Router>
          </ToastProvider>
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
