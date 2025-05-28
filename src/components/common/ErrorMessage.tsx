import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
  Fade,
  Zoom,
} from "@mui/material";
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UI_CONFIG, ANIMATIONS, ROUTES } from "../../constants";
import { animationConfigs, transitionConfigs } from "../../utils/animations";

interface ErrorMessageProps {
  message?: string;
  title?: string;
  showRefresh?: boolean;
  showHomeButton?: boolean;
  onRefresh?: () => void;
  variant?: "alert" | "page";
  severity?: "error" | "warning" | "info";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong. Please try again.",
  title = "Error",
  showRefresh = true,
  showHomeButton = false,
  onRefresh,
  variant = "alert",
  severity = "error",
}) => {
  if (variant === "page") {
    return (
      <Fade in timeout={ANIMATIONS.DURATION.NORMAL}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            textAlign: "center",
            p: UI_CONFIG.THEME.SPACING.LG,
            ...animationConfigs.fadeIn,
          }}
        >
          <Zoom in timeout={ANIMATIONS.DURATION.NORMAL + 200}>
            <Paper
              sx={{
                p: UI_CONFIG.THEME.SPACING.XL,
                borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.LARGE,
                maxWidth: 500,
                width: "100%",
                ...transitionConfigs.glow,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: UI_CONFIG.THEME.SPACING.MD,
                }}
              >
                <ErrorIcon
                  sx={{
                    fontSize: 64,
                    color: severity === "error" ? "error.main" : "warning.main",
                    ...animationConfigs.pulse,
                  }}
                />

                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight={UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.BOLD}
                  color="text.primary"
                >
                  {title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {message}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: UI_CONFIG.THEME.SPACING.SM,
                    mt: UI_CONFIG.THEME.SPACING.SM,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {showRefresh && onRefresh && (
                    <Button
                      variant="contained"
                      startIcon={<RefreshIcon />}
                      onClick={onRefresh}
                      sx={transitionConfigs.hover}
                    >
                      Try Again
                    </Button>
                  )}

                  {showHomeButton && (
                    <Button
                      variant="outlined"
                      startIcon={<HomeIcon />}
                      component={Link}
                      to={ROUTES.HOME}
                      sx={transitionConfigs.hover}
                    >
                      Go Home
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </Zoom>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={ANIMATIONS.DURATION.NORMAL}>
      <Alert
        severity={severity}
        sx={{
          borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
          ...animationConfigs.slideInDown,
        }}
        action={
          showRefresh && onRefresh ? (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRefresh}
              sx={transitionConfigs.scale}
            >
              Retry
            </Button>
          ) : undefined
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Fade>
  );
};

export default ErrorMessage;
