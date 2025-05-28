import axios from "axios";
import type { Post, User } from "../types";
import { API_CONFIG } from "../constants";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response?.status === 404) {
      throw new Error("Resource not found");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please check your connection.");
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
);

// Posts API
export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>(API_CONFIG.ENDPOINTS.POSTS);
    return response.data;
  },

  getById: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`);
    return response.data;
  },

  create: async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await api.post<Post>(API_CONFIG.ENDPOINTS.POSTS, post);
    return response.data;
  },

  update: async (post: Post): Promise<Post> => {
    const response = await api.put<Post>(
      `${API_CONFIG.ENDPOINTS.POSTS}/${post.id}`,
      post
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`);
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>(API_CONFIG.ENDPOINTS.USERS);
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
    return response.data;
  },
};

export default api;
