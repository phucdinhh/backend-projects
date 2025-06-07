import { BACKEND_URL } from "@/constants/base";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.json({ status: "ok" });
    } else {
      return NextResponse.json(
        { status: "error", message: "Backend service unavailable" },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to connect to backend" + error },
      { status: 500 }
    );
  }
}
