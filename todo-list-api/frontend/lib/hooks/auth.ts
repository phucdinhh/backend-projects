/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/components/providers/auth-provider";

// Custom hook for checking if user has specific role
export const useAuthRole = (requiredRole?: string): boolean => {
  const { user } = useAuth();

  if (!requiredRole || !user) {
    return true;
  }

  return (user as any).role === requiredRole;
};

// Custom hook for getting user permissions
export const usePermissions = (): string[] => {
  const { user } = useAuth();

  if (!user) {
    return [];
  }

  return (user as any).permissions || [];
};
