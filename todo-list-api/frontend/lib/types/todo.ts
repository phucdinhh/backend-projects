import type { BaseApiResponse, PaginatedResponse } from "./api";

// Todo Entity Types
export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number | string;
}

// Todo Request Types
export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoFilters {
  completed?: boolean;
  search?: string;
  sortBy?: "title" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface TodoListParams extends TodoFilters {
  page?: number;
  limit?: number;
}

// Todo Response Types
export interface TodoResponse extends BaseApiResponse {
  _id: string;
  title: string;
  description: string;
  owner: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoListResponse extends PaginatedResponse<Todo> {}

export interface CreateTodoResponse extends TodoResponse {}

export interface UpdateTodoResponse extends TodoResponse {}
