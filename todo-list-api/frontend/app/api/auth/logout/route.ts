import { AUTH_CONFIG } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({
      success: true,
      message: "Logout successful",
    });
    console.log("🚀 ~ POST ~ res Logout:", res.status);

    res.cookies.set(AUTH_CONFIG.COOKIES.ACCESS_TOKEN, "", {
      ...AUTH_CONFIG.COOKIES_OPTIONS,
      maxAge: 0,
      expires: new Date(0),
    });

    res.cookies.set(AUTH_CONFIG.COOKIES.REFRESH_TOKEN, "", {
      ...AUTH_CONFIG.COOKIES_OPTIONS,
      maxAge: 0,
      expires: new Date(0),
    });

    console.log("Response cookies:", res.cookies.getAll());

    return res;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}
