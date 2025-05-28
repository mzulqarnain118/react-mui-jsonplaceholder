"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  Typography,
  Slide,
  Zoom,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { UI_CONFIG, ANIMATIONS } from "../constants";
import { transitionConfigs } from "../utils/animations";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
          ...transitionConfigs.glow,
        },
      }}
    >
      <DialogTitle id="delete-dialog-title">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: UI_CONFIG.THEME.SPACING.XS,
          }}
        >
          <Zoom in={isOpen} timeout={ANIMATIONS.DURATION.NORMAL + 200}>
            <WarningIcon color="error" sx={{ fontSize: 28 }} />
          </Zoom>
          <Typography
            variant="h6"
            component="span"
            fontWeight={UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD}
          >
            Delete Post
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          id="delete-dialog-description"
          sx={{
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Are you sure you want to delete the post <strong>"{title}"</strong>?
          This action cannot be undone and will permanently remove the post from
          the system.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          p: UI_CONFIG.THEME.SPACING.SM,
          gap: UI_CONFIG.THEME.SPACING.XS,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            ...transitionConfigs.hover,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            fontWeight: UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
            ...transitionConfigs.hover,
          }}
        >
          Delete Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};
