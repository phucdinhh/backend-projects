import { API_CONFIG, AUTH_CONFIG } from "@/lib/constants";
import { RefreshTokenResponse } from "@/lib/types/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(
      AUTH_CONFIG.COOKIES.REFRESH_TOKEN
    )?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const data: RefreshTokenResponse = await response.json();

    if (!response.ok) {
      const res = NextResponse.json(
        { success: false, message: "Refresh token failed" },
        { status: 401 }
      );

      res.cookies.set(AUTH_CONFIG.COOKIES.ACCESS_TOKEN, "", {
        ...AUTH_CONFIG.COOKIES_OPTIONS,
        maxAge: 0,
      });

      res.cookies.set(AUTH_CONFIG.COOKIES.REFRESH_TOKEN, "", {
        ...AUTH_CONFIG.COOKIES_OPTIONS,
        maxAge: 0,
      });

      return res;
    }

    const res = NextResponse.json({
      success: true,
      message: "Refresh token successful",
    });

    res.cookies.set(AUTH_CONFIG.COOKIES.ACCESS_TOKEN, data.token, {
      ...AUTH_CONFIG.COOKIES_OPTIONS,
      maxAge: AUTH_CONFIG.TOKEN_EXPIRY.ACCESS_TOKEN,
    });
    return res;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { success: false, message: "Refresh token failed" },
      { status: 500 }
    );
  }
}
