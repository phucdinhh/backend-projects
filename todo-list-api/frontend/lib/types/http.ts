// HTTP Method Types
export type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// HTTP Status Codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// Request Configuration
export interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
}

// API Client Response
export interface ApiClientResponse<T = any> {
  data?: T;
  status: number;
  statusText: string;
  headers?: Headers;
}
