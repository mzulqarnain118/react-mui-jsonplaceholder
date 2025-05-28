"use client";

import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Fab,
  Alert,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  GridView as GridViewIcon,
  TableRows as TableRowsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Sort as SortIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { usersApi } from "../services/api";
import type { User } from "../types";
import { useToast } from "../contexts/ToastContext";
import { useThemeStore } from "../store/themeStore";
import { usePostsUIStore } from "../store/postsStore";
import { usePosts, useDeletePost } from "../hooks/usePosts";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import ErrorMessage from "./common/ErrorMessage";
import {
  UI_CONFIG,
  LAYOUT,
  VIEW_MODES,
  SORT_ORDERS,
  ROUTES,
  ANIMATIONS,
} from "../constants";
import {
  animationConfigs,
  transitionConfigs,
  staggerChildren,
} from "../utils/animations";

export const PostsManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);

  const { showToast } = useToast();
  const { mode, toggleTheme } = useThemeStore();
  const {
    searchTerm,
    selectedUserId,
    sortOrder,
    viewMode,
    setSearchTerm,
    setSelectedUserId,
    setSortOrder,
    setViewMode,
  } = usePostsUIStore();

  // React Query hooks
  const { data: posts = [], isLoading, error, refetch } = usePosts();
  const deletePostMutation = useDeletePost();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    // Trigger content animation after component mounts
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await usersApi.getAll();
      setUsers(usersData);
    } catch (error) {
      showToast("Failed to fetch users. Please try again.", "error");
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await deletePostMutation.mutateAsync(postToDelete);
      setDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUser =
          selectedUserId === "all" || post.userId.toString() === selectedUserId;
        return matchesSearch && matchesUser;
      })
      .sort((a, b) => {
        if (sortOrder === SORT_ORDERS.ASC) {
          return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
      });
  }, [posts, searchTerm, selectedUserId, sortOrder]);

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  if (isLoading && posts.length === 0) {
    return (
      <Container
        maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}
        sx={{ py: UI_CONFIG.THEME.SPACING.LG, textAlign: "center" }}
      >
        <Box sx={animationConfigs.pulse}>
          <CircularProgress size={60} />
        </Box>
        <Typography variant="h6" sx={{ mt: UI_CONFIG.THEME.SPACING.SM }}>
          Loading posts...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}
        sx={{ py: UI_CONFIG.THEME.SPACING.LG }}
      >
        <ErrorMessage
          variant="page"
          title="Failed to Load Posts"
          message="We couldn't fetch the posts. Please check your connection and try again."
          showRefresh
          showHomeButton
          onRefresh={() => refetch()}
        />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={LAYOUT.CONTAINER_MAX_WIDTH}
      sx={{ py: UI_CONFIG.THEME.SPACING.LG }}
    >
      {/* Theme Toggle FAB */}
      <Fade in={showContent} timeout={ANIMATIONS.DURATION.SLOW}>
        <Fab
          color="primary"
          onClick={toggleTheme}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 1000,
            ...transitionConfigs.scale,
          }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </Fab>
      </Fade>

      {/* Header */}
      <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: UI_CONFIG.THEME.SPACING.LG,
            flexWrap: "wrap",
            gap: UI_CONFIG.THEME.SPACING.SM,
            ...animationConfigs.slideInDown,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight={UI_CONFIG.TYPOGRAPHY.FONT_WEIGHTS.BOLD}
            >
              Posts Manager
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your posts with full CRUD operations
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to={ROUTES.CREATE}
            size="large"
            sx={transitionConfigs.hover}
          >
            Create Post
          </Button>
        </Box>
      </Fade>

      {/* Search and Filters */}
      <Grow
        in={showContent}
        timeout={ANIMATIONS.DURATION.NORMAL}
        style={{ transformOrigin: "top" }}
      >
        <Paper
          sx={{
            p: UI_CONFIG.THEME.SPACING.MD,
            mb: UI_CONFIG.THEME.SPACING.MD,
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
            ...transitionConfigs.glow,
          }}
        >
          <Typography variant="h6" gutterBottom>
            🔍 Filters & Search
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: UI_CONFIG.THEME.SPACING.SM,
              flexWrap: "wrap",
              alignItems: "center",
              ...staggerChildren(50),
            }}
          >
            <TextField
              placeholder="Search posts by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flexGrow: 1,
                minWidth: LAYOUT.GRID.MIN_CARD_WIDTH,
                ...transitionConfigs.smooth,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 200, ...transitionConfigs.smooth }}>
              <InputLabel>User Filter</InputLabel>
              <Select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                label="User Filter"
              >
                <MenuItem value="all">All Users</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={() =>
                setSortOrder(
                  sortOrder === SORT_ORDERS.ASC
                    ? SORT_ORDERS.DESC
                    : SORT_ORDERS.ASC
                )
              }
              sx={transitionConfigs.hover}
            >
              Sort {sortOrder === SORT_ORDERS.ASC ? "↑" : "↓"}
            </Button>
          </Box>
        </Paper>
      </Grow>

      {/* View Toggle and Stats */}
      <Fade in={showContent} timeout={ANIMATIONS.DURATION.SLOW}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: UI_CONFIG.THEME.SPACING.MD,
            flexWrap: "wrap",
            gap: UI_CONFIG.THEME.SPACING.SM,
          }}
        >
          <Chip
            label={`${filteredPosts.length} post${
              filteredPosts.length !== 1 ? "s" : ""
            } found`}
            color="primary"
            variant="outlined"
            sx={animationConfigs.scaleIn}
          />
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            aria-label="view mode"
            sx={transitionConfigs.smooth}
          >
            <ToggleButton value={VIEW_MODES.GRID} aria-label="grid view">
              <GridViewIcon sx={{ mr: 1 }} />
              Grid
            </ToggleButton>
            <ToggleButton value={VIEW_MODES.TABLE} aria-label="table view">
              <TableRowsIcon sx={{ mr: 1 }} />
              Table
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Fade>

      {/* Posts Display */}
      {viewMode === VIEW_MODES.GRID ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${LAYOUT.GRID.MIN_CARD_WIDTH}px, 1fr))`,
            gap: LAYOUT.GRID.GAP,
            ...staggerChildren(100),
          }}
        >
          {filteredPosts.map((post, index) => (
            <Grow
              key={post.id}
              in={showContent}
              timeout={ANIMATIONS.DURATION.NORMAL + index * 50}
              style={{ transformOrigin: "bottom" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
                  ...transitionConfigs.hover,
                  ...transitionConfigs.glow,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      mb: UI_CONFIG.THEME.SPACING.SM,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ flexGrow: 1, mr: 1 }}
                    >
                      {post.title}
                    </Typography>
                    <Chip
                      label={getUserName(post.userId)}
                      size="small"
                      color="secondary"
                      sx={transitionConfigs.scale}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    component={Link}
                    to={ROUTES.POST_DETAIL(post.id)}
                    color="primary"
                    aria-label="view post"
                    sx={transitionConfigs.scale}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={ROUTES.EDIT(post.id)}
                    color="secondary"
                    aria-label="edit post"
                    sx={transitionConfigs.scale}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setPostToDelete(post.id);
                      setDeleteModalOpen(true);
                    }}
                    color="error"
                    aria-label="delete post"
                    sx={transitionConfigs.scale}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grow>
          ))}
        </Box>
      ) : (
        <Fade in={showContent} timeout={ANIMATIONS.DURATION.NORMAL}>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
              ...animationConfigs.slideInUp,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Content Preview</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPosts.map((post, index) => (
                  <Fade
                    key={post.id}
                    in={showContent}
                    timeout={ANIMATIONS.DURATION.NORMAL + index * 30}
                  >
                    <TableRow
                      hover
                      sx={{
                        ...transitionConfigs.smooth,
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {post.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getUserName(post.userId)}
                          size="small"
                          color="secondary"
                          sx={transitionConfigs.scale}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            maxWidth: 300,
                          }}
                        >
                          {post.body}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            component={Link}
                            to={ROUTES.POST_DETAIL(post.id)}
                            color="primary"
                            size="small"
                            sx={transitionConfigs.scale}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            component={Link}
                            to={ROUTES.EDIT(post.id)}
                            color="secondary"
                            size="small"
                            sx={transitionConfigs.scale}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setPostToDelete(post.id);
                              setDeleteModalOpen(true);
                            }}
                            color="error"
                            size="small"
                            sx={transitionConfigs.scale}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fade>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && !isLoading && (
        <Grow in={showContent} timeout={ANIMATIONS.DURATION.SLOW}>
          <Paper
            sx={{
              p: UI_CONFIG.THEME.SPACING.XL,
              textAlign: "center",
              mt: UI_CONFIG.THEME.SPACING.LG,
              borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
              ...animationConfigs.scaleIn,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts found
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: UI_CONFIG.THEME.SPACING.MD }}
            >
              {searchTerm || selectedUserId !== "all"
                ? "Try adjusting your search criteria"
                : "Create your first post to get started"}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to={ROUTES.CREATE}
              sx={transitionConfigs.hover}
            >
              Create Post
            </Button>
          </Paper>
        </Grow>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPostToDelete(null);
        }}
        onConfirm={handleDeletePost}
        title={posts.find((p) => p.id === postToDelete)?.title || ""}
      />
    </Container>
  );
};

export default PostsManager;
