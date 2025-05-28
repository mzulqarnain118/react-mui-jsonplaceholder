import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  CircularProgress,
  FormHelperText,
  IconButton,
  Fade,
  Grow,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { usersApi } from "../services/api";
import type { User } from "../types";
import { useToast } from "../contexts/ToastContext";
import { usePost, useCreatePost, useUpdatePost } from "../hooks/usePosts";
import ErrorMessage from "./common/ErrorMessage";
import {
  UI_CONFIG,
  LAYOUT,
  VALIDATION,
  ROUTES,
  ANIMATIONS,
} from "../constants";
import { animationConfigs, transitionConfigs } from "../utils/animations";

export const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showContent, setShowContent] = useState(false);

  const { showToast } = useToast();

  // React Query hooks
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = usePost(isEditing ? Number.parseInt(id!) : 0);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const isSubmitting =
    createPostMutation.isPending || updatePostMutation.isPending;

  useEffect(() => {
    fetchUsers();
    // Trigger content animation after component mounts
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (post && isEditing) {
      setTitle(post.title);
      setBody(post.body);
      setUserId(post.userId.toString());
    }
  }, [post, isEditing]);

  const fetchUsers = async () => {
    try {
      const usersData = await usersApi.getAll();
      setUsers(usersData);
    } catch (error) {
      showToast("Failed to fetch users", "error");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = VALIDATION.MESSAGES.REQUIRED;
    } else if (title.trim().length < VALIDATION.POST.TITLE.MIN_LENGTH) {
      newErrors.title = VALIDATION.MESSAGES.MIN_LENGTH(
        VALIDATION.POST.TITLE.MIN_LENGTH
      );
    } else if (title.trim().length > VALIDATION.POST.TITLE.MAX_LENGTH) {
      newErrors.title = VALIDATION.MESSAGES.MAX_LENGTH(
        VALIDATION.POST.TITLE.MAX_LENGTH
      );
    }

    if (!body.trim()) {
      newErrors.body = VALIDATION.MESSAGES.REQUIRED;
    } else if (body.trim().length < VALIDATION.POST.BODY.MIN_LENGTH) {
      newErrors.body = VALIDATION.MESSAGES.MIN_LENGTH(
        VALIDATION.POST.BODY.MIN_LENGTH
      );
    } else if (body.trim().length > VALIDATION.POST.BODY.MAX_LENGTH) {
      newErrors.body = VALIDATION.MESSAGES.MAX_LENGTH(
        VALIDATION.POST.BODY.MAX_LENGTH
      );
    }

    if (!userId) {
      newErrors.userId = "Please select an author";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    try {
      const postData = {
        title: title.trim(),
        body: body.trim(),
        userId: Number.parseInt(userId),
        ...(isEditing && { id: Number.parseInt(id!) }),
      };

      if (isEditing) {
        await updatePostMutation.mutateAsync(postData as any);
      } else {
        await createPostMutation.mutateAsync(postData);
      }

      navigate(ROUTES.HOME);
    } catch (error) {
      // Error is handled by the hooks
    }
  };

  if (postLoading && isEditing) {
    return (
      <Container
        maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}
        sx={{ py: UI_CONFIG.THEME.SPACING.LG, textAlign: "center" }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: UI_CONFIG.THEME.SPACING.SM }}>
          Loading post...
        </Typography>
      </Container>
    );
  }

  if (postError && isEditing) {
    return (
      <Container
        maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}
        sx={{ py: UI_CONFIG.THEME.SPACING.LG }}
      >
        <ErrorMessage
          variant="page"
          title="Failed to Load Post"
          message="We couldn't fetch the post details. Please try again."
          showRefresh
          showHomeButton
          onRefresh={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}
      sx={{ py: UI_CONFIG.THEME.SPACING.LG }}
    >
      <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: UI_CONFIG.THEME.SPACING.SM,
            mb: UI_CONFIG.THEME.SPACING.LG,
            ...animationConfigs.slideInLeft,
          }}
        >
          <IconButton
            onClick={() => navigate(ROUTES.HOME)}
            color="primary"
            sx={transitionConfigs.scale}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.BOLD}
            >
              {isEditing ? "Edit Post" : "Create New Post"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {isEditing
                ? "Update your post details"
                : "Fill in the details to create a new post"}
            </Typography>
          </Box>
        </Box>
      </Fade>

      <Grow
        in={showContent}
        timeout={ANIMATIONS.DURATION.NORMAL}
        style={{ transformOrigin: "top" }}
      >
        <Paper
          sx={{
            p: UI_CONFIG.THEME.SPACING.LG,
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
            ...transitionConfigs.glow,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {isEditing ? "Edit Post" : "New Post"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: UI_CONFIG.THEME.SPACING.MD }}
          >
            {isEditing
              ? "Make changes to your post"
              : "Create a new post to share with others"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: UI_CONFIG.THEME.SPACING.MD,
            }}
          >
            <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL + 200}>
              <TextField
                label="Title"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                error={!!errors.title}
                helperText={errors.title}
                sx={transitionConfigs.smooth}
              />
            </Fade>

            <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL + 300}>
              <FormControl
                fullWidth
                required
                error={!!errors.userId}
                sx={transitionConfigs.smooth}
              >
                <InputLabel>Author</InputLabel>
                <Select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  label="Author"
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                      {user.name} (@{user.username})
                    </MenuItem>
                  ))}
                </Select>
                {errors.userId && (
                  <FormHelperText>{errors.userId}</FormHelperText>
                )}
              </FormControl>
            </Fade>

            <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL + 400}>
              <TextField
                label="Content"
                required
                fullWidth
                multiline
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your post content here..."
                error={!!errors.body}
                helperText={errors.body || `${body.length} characters`}
                sx={transitionConfigs.smooth}
              />
            </Fade>

            <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL + 500}>
              <Box
                sx={{
                  display: "flex",
                  gap: UI_CONFIG.THEME.SPACING.SM,
                  pt: UI_CONFIG.THEME.SPACING.SM,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} sx={animationConfigs.spin} />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  sx={{
                    flex: 1,
                    ...transitionConfigs.hover,
                  }}
                >
                  {isSubmitting
                    ? isEditing
                      ? "Updating..."
                      : "Creating..."
                    : isEditing
                    ? "Update Post"
                    : "Create Post"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(ROUTES.HOME)}
                  sx={transitionConfigs.hover}
                >
                  Cancel
                </Button>
              </Box>
            </Fade>
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};

export default PostForm;
