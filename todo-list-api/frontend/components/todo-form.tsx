"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { INTERNAL_API, UI_CONFIG, TOAST_MESSAGES } from "@/lib/constants";
import type { CreateTodoRequest, CreateTodoResponse } from "@/lib/types/todo";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requestData: CreateTodoRequest = { title, description };

      const response = await api.post<CreateTodoResponse>(
        INTERNAL_API.TODOS.BASE,
        requestData
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          response.data.message || TOAST_MESSAGES.TODOS.CREATE_ERROR
        );
      }

      setTitle("");
      setDescription("");
      toast.success("Success", {
        description: TOAST_MESSAGES.TODOS.CREATE_SUCCESS,
        duration: UI_CONFIG.TOAST_DURATION.SUCCESS,
      });
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : TOAST_MESSAGES.TODOS.CREATE_ERROR,
        duration: UI_CONFIG.TOAST_DURATION.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={UI_CONFIG.FORM_VALIDATION.MAX_TITLE_LENGTH}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Todo description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={UI_CONFIG.FORM_VALIDATION.MAX_DESCRIPTION_LENGTH}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Add Todo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
