"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";
import { INTERNAL_API, UI_CONFIG, TOAST_MESSAGES } from "@/lib/constants";
import type {
  Todo,
  TodoListResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from "@/lib/types/todo";

interface TodoListProps {
  initialTodos: TodoListResponse;
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos.data);
  const [page, setPage] = useState(initialTodos.meta.page);
  const [limit] = useState(initialTodos.meta.limit);
  const [total, setTotal] = useState(initialTodos.meta.total);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<TodoListResponse>(
        `${INTERNAL_API.TODOS.BASE}?page=${page}&limit=${limit}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch todos");
      }

      setTodos(response.data?.data || []);
      setTotal(response.data?.meta.total || 0);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : TOAST_MESSAGES.TODOS.FETCH_ERROR,
        duration: UI_CONFIG.TOAST_DURATION.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  // useEffect(() => {
  //   fetchTodos();
  // }, [fetchTodos]);

  const startEditing = (todo: Todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const updateTodo = async (id: string) => {
    try {
      const requestData: UpdateTodoRequest = {
        title: editTitle,
        description: editDescription,
      };

      const response = await api.put<UpdateTodoResponse>(
        INTERNAL_API.TODOS.BY_ID(id),
        requestData
      );

      if (response.status !== 200) {
        throw new Error("Failed to update todo");
      }

      setTodos(
        todos?.map((todo) =>
          todo._id === id ? (response.data as Todo) : todo
        ) || []
      );
      setEditingId(null);
      toast.success("Success", {
        description: TOAST_MESSAGES.TODOS.UPDATE_SUCCESS,
        duration: UI_CONFIG.TOAST_DURATION.SUCCESS,
      });
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : TOAST_MESSAGES.TODOS.UPDATE_ERROR,
        duration: UI_CONFIG.TOAST_DURATION.ERROR,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await api.delete(INTERNAL_API.TODOS.BY_ID(id));

      if (response.status !== 204 && response.status !== 200) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Success", {
        description: TOAST_MESSAGES.TODOS.DELETE_SUCCESS,
        duration: UI_CONFIG.TOAST_DURATION.SUCCESS,
      });

      // Refresh if we deleted the last item on the page
      if (todos.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchTodos();
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : TOAST_MESSAGES.TODOS.DELETE_ERROR,
        duration: UI_CONFIG.TOAST_DURATION.ERROR,
      });
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Todos ({total})</h2>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : todos.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No todos found. Create one above!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <Card key={todo._id}>
              {editingId === todo._id ? (
                <CardContent className="p-4 space-y-4">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Todo title"
                  />
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Todo description"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => updateTodo(todo._id)}>
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="text-lg">{todo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{todo.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditing(todo)}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center px-2">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
