"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FavoritesListProps {
  favorites: string[];
  onFavoriteClick: (cityName: string) => void;
  onRemoveFavorite: (cityName: string) => void;
  loading?: boolean;
}

export function FavoritesList({
  favorites,
  onFavoriteClick,
  onRemoveFavorite,
  loading = false,
}: FavoritesListProps) {
  if (!favorites || favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Favorite Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription className="text-gray-500">
              No favorite cities yet. Search for a city and click the star icon
              to add it to your favorites.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Favorite Cities ({favorites.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading && (
          <div className="flex justify-center py-2">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        <div className={loading ? "opacity-50 pointer-events-none" : ""}>
          {favorites.map((city) => (
            <div
              key={city}
              className="flex items-center justify-between group py-1"
            >
              <Button
                variant="ghost"
                className="flex-1 justify-start font-normal"
                onClick={() => onFavoriteClick(city)}
              >
                {city}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemoveFavorite(city)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
