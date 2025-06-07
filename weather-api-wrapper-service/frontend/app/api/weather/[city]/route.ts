import { BACKEND_URL } from "@/constants/base";
import { WeatherForecast } from "@/types/weather";
import { ApiError } from "@/types/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { city: string } }
) {
  const { city } = await params;

  try {
    const response = await fetch(
      `${BACKEND_URL}/weather/${encodeURIComponent(city)}`,
      {
        cache: "no-store",
      }
    );
    console.log("🚀 ~ response:", response);

    const data: WeatherForecast | ApiError = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: (data as ApiError).error,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data as WeatherForecast, {
      status: 200,
    });
  } catch (error) {
    const apiError: ApiError = {
      status: "error",
      message: `Failed to fetch weather data for ${city}: ${error}`,
    };
    return NextResponse.json(apiError, { status: 500 });
  }
}
