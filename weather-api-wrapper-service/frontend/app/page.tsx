"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Cloud, Star, StarOff, X } from "lucide-react";
import { WeatherCard } from "@/components/weather-card";
import { FavoritesList } from "@/components/favorites-list";
import { SearchHistory } from "@/components/search-history";
import { WeatherForecast } from "@/types/weather";
import { useDebounce } from "@/hooks/useDebounce";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const debounceSearchCity = useDebounce(city, 500);

  // Load search history and favorites from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("weather-search-history");
      const savedFavorites = localStorage.getItem("weather-favorites");

      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (err) {
      console.error("Error loading data from localStorage:", err);
      setError("Failed to load saved data. Please try refreshing the page.");
    }
  }, []);

  // Save to localStorage whenever history or favorites change
  useEffect(() => {
    try {
      localStorage.setItem(
        "weather-search-history",
        JSON.stringify(searchHistory)
      );
    } catch (err) {
      console.error("Error saving search history:", err);
      setError("Failed to save search history. Your searches may not persist.");
    }
  }, [searchHistory]);

  useEffect(() => {
    try {
      localStorage.setItem("weather-favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Error saving favorites:", err);
      setError("Failed to save favorites. Your favorites may not persist.");
    }
  }, [favorites]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!debounceSearchCity || debounceSearchCity.length < 3) {
        return;
      }
      await fetchWeather(debounceSearchCity);
    };
    fetchWeatherData();
  }, [debounceSearchCity]);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `/api/weather/${encodeURIComponent(cityName.trim())}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeather(data);

      // Add to search history (avoid duplicates and limit to 10)
      setSearchHistory((prev) => {
        const filtered = prev.filter(
          (item) => item.toLowerCase() !== cityName.toLowerCase()
        );
        return [cityName, ...filtered].slice(0, 10);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    if (value.length >= 3) {
      setCity(value);
    }
  };

  const clearSearch = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  const handleHistoryClick = (cityName: string) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const toggleFavorite = async (cityName: string) => {
    setFavoritesLoading(true);
    try {
      setFavorites((prev) => {
        const isAlreadyFavorite = prev.some(
          (fav) => fav.toLowerCase() === cityName.toLowerCase()
        );
        if (isAlreadyFavorite) {
          return prev.filter(
            (fav) => fav.toLowerCase() !== cityName.toLowerCase()
          );
        } else {
          return [...prev, cityName].slice(0, 20); // Limit to 20 favorites
        }
      });
    } catch (err) {
      console.error("🚀 ~ toggleFavorite ~ err:", err);
      setError("Failed to update favorites. Please try again.");
    } finally {
      setFavoritesLoading(false);
    }
  };

  const isFavorite =
    weather?.address && favorites?.length
      ? favorites.some(
          (fav) => fav.toLowerCase() === weather.address.toLowerCase()
        )
      : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Weather Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time weather data with intelligent caching
          </p>
          <Badge variant="outline" className="mt-2">
            Powered by Next.js API Routes
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Search and Weather Display */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Weather Search
                </CardTitle>
                <CardDescription>
                  Enter a city name to get current weather conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Enter city name (e.g., London, New York)"
                      value={city}
                      onChange={handleCityChange}
                      className="pr-10"
                      aria-label="City name"
                    />
                    {city && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={clearSearch}
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Button type="submit" disabled={loading || !city.trim()}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading
                      </>
                    ) : (
                      "Get Weather"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {weather && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Current Weather
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(weather.address)}
                    className="flex items-center gap-2"
                    disabled={favoritesLoading}
                  >
                    {favoritesLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isFavorite ? (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        Remove from Favorites
                      </>
                    ) : (
                      <>
                        <StarOff className="h-4 w-4" />
                        Add to Favorites
                      </>
                    )}
                  </Button>
                </div>
                <WeatherCard weather={weather} />
              </div>
            )}
          </div>

          {/* Sidebar with History and Favorites */}
          <div className="space-y-6">
            <FavoritesList
              favorites={favorites}
              onFavoriteClick={handleHistoryClick}
              onRemoveFavorite={toggleFavorite}
              loading={favoritesLoading}
            />

            <SearchHistory
              history={searchHistory}
              onHistoryClick={handleHistoryClick}
              onClearHistory={() => setSearchHistory([])}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Weather data cached with Redis for optimal performance.
            <br />
            Connected via Next.js API Routes to your backend.
          </p>
        </div>
      </div>
    </div>
  );
}
