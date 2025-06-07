"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Trash2, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (cityName: string) => void;
  onClearHistory: () => void;
}

export function SearchHistory({
  history,
  onHistoryClick,
  onClearHistory,
}: SearchHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Search History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription className="text-gray-500">
              Your search history will appear here. Search for a city to get
              started.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Search History ({history.length})
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Search History</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear your search history? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClearHistory}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Clear History
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {history.map((city, index) => (
          <div
            key={`${city}-${index}`}
            className="flex items-center justify-between group py-1"
          >
            <Button
              variant="ghost"
              className="flex-1 justify-start font-normal"
              onClick={() => onHistoryClick(city)}
            >
              <Clock className="h-4 w-4 mr-2 opacity-50" />
              {city}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
