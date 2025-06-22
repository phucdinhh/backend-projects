// UI Constants
export const UI_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  TOAST_DURATION: {
    SUCCESS: 3000,
    ERROR: 5000,
    WARNING: 4000,
  },

  LOADING_DELAYS: {
    MIN_LOADING_TIME: 500, // Minimum time to show loading state
    DEBOUNCE_DELAY: 300, // Debounce delay for search/input
  },

  FORM_VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
  },
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Login successful",
    LOGIN_ERROR: "Login failed",
    REGISTER_SUCCESS: "Registration successful",
    REGISTER_ERROR: "Registration failed",
    LOGOUT_SUCCESS: "Logged out successfully",
    UNAUTHORIZED: "Please log in to continue",
  },

  TODOS: {
    CREATE_SUCCESS: "Todo created successfully",
    CREATE_ERROR: "Failed to create todo",
    UPDATE_SUCCESS: "Todo updated successfully",
    UPDATE_ERROR: "Failed to update todo",
    DELETE_SUCCESS: "Todo deleted successfully",
    DELETE_ERROR: "Failed to delete todo",
    FETCH_ERROR: "Failed to fetch todos",
  },

  GENERAL: {
    NETWORK_ERROR: "Network error occurred",
    UNKNOWN_ERROR: "An unexpected error occurred",
  },
} as const;
