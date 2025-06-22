import { API_CONFIG, AUTH_CONFIG } from "@/lib/constants";
import { LoginRequest, LoginResponse } from "@/lib/types/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json<LoginResponse>(
        {
          message: data.message || "Login failed",
          token: data.token,
        },
        { status: response.status }
      );
    }

    const res = NextResponse.json<LoginResponse>({
      success: true,
      message: "Login successful",
      token: data.token,
      user: data.user,
    });

    res.cookies.set(AUTH_CONFIG.COOKIES.ACCESS_TOKEN, data.token, {
      ...AUTH_CONFIG.COOKIES_OPTIONS,
      maxAge: AUTH_CONFIG.TOKEN_EXPIRY.ACCESS_TOKEN,
    });

    if (data?.refreshToken) {
      res.cookies.set(AUTH_CONFIG.COOKIES.REFRESH_TOKEN, data.refreshToken, {
        ...AUTH_CONFIG.COOKIES_OPTIONS,
        maxAge: AUTH_CONFIG.TOKEN_EXPIRY.REFRESH_TOKEN,
      });
    }

    return res;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
