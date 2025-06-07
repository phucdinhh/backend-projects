import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Cloud,
  Clock,
} from "lucide-react";
import { WeatherForecast } from "@/types/weather";

interface WeatherCardProps {
  weather: WeatherForecast;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  console.log("🚀 ~ WeatherCard ~ weather:", weather);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{weather.resolvedAddress}</span>
          <div className="flex items-center gap-2">
            <Badge
              variant={weather.source === "cache" ? "secondary" : "default"}
              className={
                weather.source === "cache"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }
            >
              {weather.source === "cache" ? "From Cache" : "Fresh Data"}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Last updated:{" "}
          {new Date(weather?.currentConditions?.datetimeEpoch).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Thermometer className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-900">
                {weather.currentConditions.temp}°C
              </p>
              <p className="text-sm text-blue-700">
                Feels like {weather.currentConditions?.feelslike}°C
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Cloud className="h-8 w-8 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">
                {weather.description}
              </p>
              <p className="text-sm text-gray-600">Conditions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
            <Droplets className="h-8 w-8 text-cyan-600" />
            <div>
              <p className="text-xl font-bold text-cyan-900">
                {weather.currentConditions.humidity}%
              </p>
              <p className="text-sm text-cyan-700">Humidity</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <Wind className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-xl font-bold text-green-900">
                {weather.currentConditions.windspeed} km/h
              </p>
              <p className="text-sm text-green-700">Wind Speed</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <Eye className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-xl font-bold text-purple-900">
                {weather.currentConditions.visibility} km
              </p>
              <p className="text-sm text-purple-700">Visibility</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
            <Gauge className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-xl font-bold text-orange-900">
                {weather.currentConditions.pressure} mb
              </p>
              <p className="text-sm text-orange-700">Pressure</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
