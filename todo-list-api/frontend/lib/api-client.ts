import { API_CONFIG, INTERNAL_API } from "@/lib/constants";
import { ApiClientResponse, RequestConfig } from "@/lib/types";

export async function apiRequest<T = any>(
  url: string,
  options: RequestConfig = {}
): Promise<ApiClientResponse<T>> {
  let response = await fetch(`${API_CONFIG.APP_URL}${url}`, options);

  console.log("🚀 ~ response:", url, response.status);
  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${API_CONFIG.APP_URL}${INTERNAL_API.AUTH.REFRESH}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("🚀 ~ refreshResponse:", refreshResponse.status);

    if (refreshResponse.ok) {
      response = await fetch(url, options);
    } else {
      throw new Error("User not authenticated");
    }
  }

  const data = await response.json();

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  };
}

export const api = {
  get: <T = any>(url: string, config?: RequestConfig) =>
    apiRequest<T>(url, { ...config, method: "GET" }),

  post: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    apiRequest<T>(url, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
      body: JSON.stringify(data),
    }),

  put: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    apiRequest<T>(url, {
      ...config,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
      body: JSON.stringify(data),
    }),

  delete: <T = any>(url: string, config?: RequestConfig) =>
    apiRequest<T>(url, { ...config, method: "DELETE" }),
};
