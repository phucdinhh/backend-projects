import { API_CONFIG, AUTH_CONFIG } from "@/lib/constants";
import { UpdateTodoRequest, UpdateTodoResponse } from "@/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: UpdateTodoRequest = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_CONFIG.COOKIES.ACCESS_TOKEN)?.value;

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Update todo failed" },
        { status: response.status }
      );
    }

    const data: UpdateTodoResponse = await response.json();

    return NextResponse.json({ message: "Update todo successful", data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_CONFIG.COOKIES.ACCESS_TOKEN)?.value;

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODOS}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Delete todo failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Delete todo successful" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
