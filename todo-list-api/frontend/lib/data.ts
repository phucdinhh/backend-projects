"use server";

import { api } from "@/lib/api-client";
import { AUTH_CONFIG, INTERNAL_API, UI_CONFIG } from "@/lib/constants";
import type { TodoListResponse } from "@/lib/types/todo";
import { cookies } from "next/headers";

// This file contains functions for fetching data from the API
export async function getTodos(
  page = UI_CONFIG.PAGINATION.DEFAULT_PAGE,
  limit = UI_CONFIG.PAGINATION.DEFAULT_LIMIT
): Promise<TodoListResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_CONFIG.COOKIES.ACCESS_TOKEN)?.value;

    console.log("🚀 ~ cookieStore.getAll():", cookieStore.getAll());

    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await api.get(
      `${INTERNAL_API.TODOS.BASE}?page=${page}&limit=${limit}`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );
    console.log("🚀 ~ response:", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch todos");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      data: [],
      meta: {
        page: UI_CONFIG.PAGINATION.DEFAULT_PAGE,
        limit: UI_CONFIG.PAGINATION.DEFAULT_LIMIT,
        total: 0,
      },
    };
  }
}
