"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Chip,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  FlashOn as FlashOnIcon,
} from "@mui/icons-material";
import { postsApi, usersApi } from "../services/api";
import type { Post, User } from "../types";
import { useToast } from "../contexts/ToastContext";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      fetchPostAndUser(Number.parseInt(id));
    }
  }, [id]);

  const fetchPostAndUser = async (postId: number) => {
    try {
      setLoading(true);
      const postData = await postsApi.getById(postId);
      const userData = await usersApi.getById(postData.userId);
      setPost(postData);
      setUser(userData);
    } catch (error) {
      showToast("Failed to fetch post details", "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!post) return;

    try {
      await postsApi.delete(post.id);
      showToast("Post deleted successfully!", "success");
      navigate("/");
    } catch (error) {
      showToast("Failed to delete post", "error");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading post...
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Post not found
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Back to Posts
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <IconButton onClick={() => navigate("/")} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Post Details
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            View and manage this post
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={Link}
            to={`/edit/${post.id}`}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 300px" },
          gap: 3,
        }}
      >
        {/* Main Content */}
        <Paper sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Post ID: {post.id}
              </Typography>
            </Box>
            <Chip
              label={user ? user.name : `User ${post.userId}`}
              color="primary"
              variant="outlined"
            />
          </Box>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, whiteSpace: "pre-wrap" }}
          >
            {post.body}
          </Typography>
        </Paper>

        {/* Sidebar */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Author Information */}
          {user && (
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                }
                title="Author Information"
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  @{user.username}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>

                  {user.website && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LanguageIcon fontSize="small" color="action" />
                      <Typography
                        variant="body2"
                        component="a"
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", textDecoration: "none" }}
                      >
                        {user.website}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Post Metadata */}
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <AssessmentIcon />
                </Avatar>
              }
              title="Post Metadata"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Post ID:
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    {post.id}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Author ID:
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    {post.userId}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Word Count:
                  </Typography>
                  <Typography variant="body2">
                    {post.body.split(" ").length} words
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Character Count:
                  </Typography>
                  <Typography variant="body2">
                    {post.body.length} chars
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <FlashOnIcon />
                </Avatar>
              }
              title="Quick Actions"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  component={Link}
                  to={`/edit/${post.id}`}
                  fullWidth
                >
                  Edit Post
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteModalOpen(true)}
                  fullWidth
                >
                  Delete Post
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        title={post.title}
      />
    </Container>
  );
};

export default PostDetail;
