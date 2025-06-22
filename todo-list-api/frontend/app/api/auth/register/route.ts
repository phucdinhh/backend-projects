import { API_CONFIG, AUTH_CONFIG } from "@/lib/constants";
import { RegisterRequest, RegisterResponse } from "@/lib/types/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Register failed" },
        { status: response.status }
      );
    }

    const data: RegisterResponse = await response.json();

    const res = NextResponse.json({
      success: true,
      message: "Register successful",
    });

    res.cookies.set(AUTH_CONFIG.COOKIES.ACCESS_TOKEN, data.token, {
      ...AUTH_CONFIG.COOKIES_OPTIONS,
    });

    if (data?.refreshToken) {
      res.cookies.set(AUTH_CONFIG.COOKIES.REFRESH_TOKEN, data?.refreshToken, {
        ...AUTH_CONFIG.COOKIES_OPTIONS,
      });
    }

    return res;
  } catch (error) {
    console.error("Error registering:", error);
    return NextResponse.json(
      { success: false, message: "Register failed" },
      { status: 500 }
    );
  }
}
