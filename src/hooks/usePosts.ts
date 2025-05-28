import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { postsApi } from "../services/api";
import type { Post, CreatePostRequest, UpdatePostRequest } from "../types";
import { QUERY_KEYS } from "../constants";

export const usePosts = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: async () => {
      try {
        const posts = await postsApi.getAll();
        return posts;
      } catch (error: any) {
        enqueueSnackbar("Failed to fetch posts", { variant: "error" });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
  });
};

export const usePost = (id: number) => {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryKey: [QUERY_KEYS.POST, id],
    queryFn: async () => {
      try {
        return await postsApi.getById(id);
      } catch (error: any) {
        enqueueSnackbar("Failed to fetch post", { variant: "error" });
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postsApi.create(data),
    onSuccess: (newPost) => {
      // Optimistically update the cache
      queryClient.setQueryData<Post[]>([QUERY_KEYS.POSTS], (oldPosts) => {
        return oldPosts ? [newPost, ...oldPosts] : [newPost];
      });

      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      enqueueSnackbar("Post created successfully!", { variant: "success" });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || "Failed to create post", {
        variant: "error",
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => postsApi.update(data),
    onSuccess: (updatedPost) => {
      // Optimistically update the posts list cache
      queryClient.setQueryData<Post[]>([QUERY_KEYS.POSTS], (oldPosts) => {
        return (
          oldPosts?.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ) || []
        );
      });

      // Update the individual post cache
      queryClient.setQueryData([QUERY_KEYS.POST, updatedPost.id], updatedPost);

      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST, updatedPost.id],
      });

      enqueueSnackbar("Post updated successfully!", { variant: "success" });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || "Failed to update post", {
        variant: "error",
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (id: number) => postsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Optimistically update the cache
      queryClient.setQueryData<Post[]>([QUERY_KEYS.POSTS], (oldPosts) => {
        return oldPosts?.filter((post) => post.id !== deletedId) || [];
      });

      // Remove the individual post from cache
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.POST, deletedId] });

      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      enqueueSnackbar("Post deleted successfully!", { variant: "success" });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || "Failed to delete post", {
        variant: "error",
      });
    },
  });
};
