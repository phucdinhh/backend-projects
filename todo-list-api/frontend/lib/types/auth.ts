import { BaseApiResponse } from "@/lib/types/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

export interface LoginResponse extends BaseApiResponse, AuthTokens {
  user?: User;
}

export interface RegisterResponse extends BaseApiResponse, AuthTokens {
  user?: User;
}

export interface RefreshTokenResponse extends BaseApiResponse, AuthTokens {}

export interface User {
  id: number | string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
