"use client";

import { INTERNAL_API, ROUTES } from "@/lib/constants";
import { AuthContextType, User } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  login: async () => {},
  logout: async () => {},
});

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialAuth?: boolean;
}

export default function AuthProvider({
  children,
  initialAuth = false,
}: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (!isAuthenticated) {
          router.push(ROUTES.LOGIN);
        }

        if (!user) {
          const response = await fetch(`${INTERNAL_API.AUTH.ME}`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            router.push(ROUTES.LOGIN);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, user, router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setIsAuthenticated(true);

    try {
      const response = await fetch(INTERNAL_API.AUTH.LOGIN, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      }

      router.push(ROUTES.DASHBOARD);
      router.refresh();
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(undefined);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(INTERNAL_API.AUTH.LOGOUT, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout request failed");
      }

      setIsAuthenticated(false);
      setUser(undefined);

      router.push(ROUTES.LOGIN);
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
