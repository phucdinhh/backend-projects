import { API_CONFIG, AUTH_CONFIG } from "@/lib/constants";
import {
  CreateTodoRequest,
  CreateTodoResponse,
  TodoListResponse,
} from "@/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    const cookieStore = await cookies();
    console.log("🚀 ~ GET ~ cookieStore:", cookieStore.getAll());
    const token = cookieStore.get(AUTH_CONFIG.COOKIES.ACCESS_TOKEN)?.value;
    console.log("🚀 ~ GET ~ token:", token);

    if (!token) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch todos" },
        { status: res.status }
      );
    }

    const data: TodoListResponse = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateTodoRequest = await request.json();
    const cookieStore = await cookies();

    const token = cookieStore.get(AUTH_CONFIG.COOKIES.ACCESS_TOKEN)?.value;

    if (!token) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to create todo" },
        { status: res.status }
      );
    }

    const data: CreateTodoResponse = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to create todo" },
      { status: 500 }
    );
  }
}
