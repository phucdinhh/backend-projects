import { ROUTES } from "@/lib/constants";

export const AUTH_CONFIG = {
  COOKIES: {
    ACCESS_TOKEN: "token",
    REFRESH_TOKEN: "refreshToken",
  },
  TOKEN_EXPIRY: {
    ACCESS_TOKEN: 60 * 60, // 1 hour
    REFRESH_TOKEN: 60 * 60 * 24 * 7, // 7 days
  },
  COOKIES_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "Lax" as const,
    path: "/",
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.HOME,
] as const;

export const PROTECED_ROUTES = [ROUTES.DASHBOARD] as const;
