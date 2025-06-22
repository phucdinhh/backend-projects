export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
} as const;

export const MIDDLEWARE_CONFIG = {
  EXCLUDED_PATHS: ["/api", "/_next/static", "/_next/image", "/favicon.ico"],
  MATCHER: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} as const;
