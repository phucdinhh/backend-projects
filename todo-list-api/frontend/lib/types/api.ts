export interface BaseApiResponse {
  success?: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiResponse<T = any> extends BaseApiResponse {
  data?: T;
}

export interface ApiError extends BaseApiResponse {
  code?: string;
  details?: any;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PaginatedResponse<T> extends BaseApiResponse {
  data: T[];
  meta: PaginationMeta;
}
