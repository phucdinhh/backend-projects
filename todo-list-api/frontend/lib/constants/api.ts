export const API_CONFIG = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3010",
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  ENDPOINTS: {
    LOGIN: "/login",
    REGISTER: "/register",
    REFRESH: "/refresh",
    ME: "/me",

    TODOS: "/todos",
  },
  TIMEOUT: {
    DEFAULT: 10000, // 10s
    AUTH: 15000, // 15s
  },
} as const;

export const INTERNAL_API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  TODOS: {
    BASE: "/api/todos",
    BY_ID: (id: number | string) => `/api/todos/${id}`,
  },
} as const;
