// Common utility types using type aliases where appropriate
export type Theme = "light" | "dark" | "system";

export type ToastVariant = "default" | "destructive" | "success";

export type SortOrder = "asc" | "desc";

// Union types work better with type aliases
export type ApiStatus = "idle" | "loading" | "success" | "error";

export type UserRole = "admin" | "user" | "moderator";

// Complex computed types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Function types
export type EventHandler<T = any> = (event: T) => void;

export type AsyncFunction<T = any, R = any> = (args: T) => Promise<R>;
