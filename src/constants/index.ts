// API Configuration
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  ENDPOINTS: {
    POSTS: "/posts",
    USERS: "/users",
    COMMENTS: "/comments",
  },
  TIMEOUT: 10000,
} as const;

// UI Constants
export const UI_CONFIG = {
  THEME: {
    BORDER_RADIUS: {
      SMALL: 1,
      MEDIUM: 3,
      LARGE: 5,
    },
    SPACING: {
      XS: 1,
      SM: 2,
      MD: 3,
      LG: 4,
      XL: 6,
    },
    BREAKPOINTS: {
      MOBILE: "xs",
      TABLET: "md",
      DESKTOP: "lg",
      WIDE: "xl",
    },
  },
  COLORS: {
    PRIMARY: "#1976d2",
    SECONDARY: "#dc004e",
    SUCCESS: "#2e7d32",
    ERROR: "#d32f2f",
    WARNING: "#ed6c02",
    INFO: "#0288d1",
  },
  TYPOGRAPHY: {
    FONT_FAMILY: '"Roboto", "Helvetica", "Arial", sans-serif',
    FONT_WEIGHTS: {
      REGULAR: 400,
      MEDIUM: 500,
      SEMIBOLD: 600,
      BOLD: 700,
    },
  },
} as const;

// Animation Constants
export const ANIMATIONS = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: "cubic-bezier(0.4, 0, 1, 1)",
    EASE_OUT: "cubic-bezier(0, 0, 0.2, 1)",
    EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  TRANSITIONS: {
    FADE: "opacity",
    SLIDE: "transform",
    SCALE: "transform",
    ALL: "all",
  },
} as const;

// Form Validation Constants
export const VALIDATION = {
  POST: {
    TITLE: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100,
    },
    BODY: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 1000,
    },
  },
  MESSAGES: {
    REQUIRED: "This field is required",
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  },
} as const;

// Layout Constants
export const LAYOUT = {
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 56,
  SIDEBAR_WIDTH: 280,
  CONTAINER_MAX_WIDTH: "xl",
  GRID: {
    MIN_CARD_WIDTH: 300,
    GAP: 3,
  },
} as const;

// Notification Constants
export const NOTIFICATIONS = {
  DURATION: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 7000,
  },
  POSITION: {
    TOP_RIGHT: { vertical: "top", horizontal: "right" },
    BOTTOM_RIGHT: { vertical: "bottom", horizontal: "right" },
    TOP_CENTER: { vertical: "top", horizontal: "center" },
  },
  MAX_SNACK: 3,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  THEME_MODE: "theme-mode",
  VIEW_MODE: "view-mode",
  USER_PREFERENCES: "user-preferences",
} as const;

// View Modes
export const VIEW_MODES = {
  GRID: "grid",
  TABLE: "table",
} as const;

// Sort Orders
export const SORT_ORDERS = {
  ASC: "asc",
  DESC: "desc",
} as const;

// Loading States
export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

// Route Paths
export const ROUTES = {
  HOME: "/",
  CREATE: "/create",
  EDIT: (id: string | number) => `/edit/${id}`,
  POST_DETAIL: (id: string | number) => `/post/${id}`,
} as const;

// Query Keys
export const QUERY_KEYS = {
  POSTS: "posts",
  POST: "post",
  USERS: "users",
  USER: "user",
} as const;
