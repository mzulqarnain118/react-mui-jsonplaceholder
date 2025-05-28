import type React from "react";
import { Box, Container, Fade } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { UI_CONFIG, LAYOUT, ANIMATIONS } from "../../constants";
import { animationConfigs } from "../../utils/animations";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        ...animationConfigs.fadeIn,
      }}
    >
      <Fade in timeout={ANIMATIONS.DURATION.NORMAL}>
        <Box>
          <Header />
        </Box>
      </Fade>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: UI_CONFIG.THEME.SPACING.MD,
        }}
      >
        <Container maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}>
          <Fade in timeout={ANIMATIONS.DURATION.NORMAL + 200}>
            <Box>{children}</Box>
          </Fade>
        </Container>
      </Box>

      <Fade in timeout={ANIMATIONS.DURATION.SLOW}>
        <Box>
          <Footer />
        </Box>
      </Fade>
    </Box>
  );
};

export default AppLayout;
