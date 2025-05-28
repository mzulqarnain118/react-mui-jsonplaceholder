"use client";

import type React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Brightness4, Brightness7, Add as AddIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";
import { ROUTES } from "../../constants";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeStore();

  const isHomePage =
    location.pathname === ROUTES.HOME || location.pathname === ROUTES.HOME;

  return (
    <AppBar position="sticky" elevation={2} sx={{ borderRadius: 0, py: 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => navigate(ROUTES.HOME)}
        >
          📝 Posts Manager
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isHomePage && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate(ROUTES.CREATE)}
              sx={{
                mr: 1,
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              Create Post
            </Button>
          )}

          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="toggle theme"
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
