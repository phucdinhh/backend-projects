import type React from "react";
// Central export for all types
export * from "./api";
export * from "./auth";
export * from "./todo";
export * from "./http";
export * from "./common";

// Component Props Types - interfaces for object shapes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form Types - interfaces for object structures
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Toast Types - interface for object shape
export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}
