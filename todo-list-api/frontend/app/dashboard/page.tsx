import { redirect } from "next/navigation";
import TodoList from "@/components/todo-list";
import TodoForm from "@/components/todo-form";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { getTodos } from "@/lib/data";
import { API_CONFIG, INTERNAL_API, ROUTES } from "@/lib/constants";

export default async function DashboardPage() {
  async function logoutAction() {
    "use server";
    const response = await fetch(
      `${API_CONFIG.APP_URL}${INTERNAL_API.AUTH.LOGOUT}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("🚀 ~ logoutAction ~ response:", response.status);

    if (response.ok) {
      redirect(ROUTES.LOGIN);
    }
  }

  const initialTodos = await getTodos(1, 10);
  console.log("🚀 ~ DashboardPage ~ initialTodos:", initialTodos);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Todo List</h1>
          <form action={logoutAction}>
            <Button variant="outline" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>

        <TodoForm />

        <div className="mt-8">
          <TodoList initialTodos={initialTodos} />
        </div>
      </div>
    </div>
  );
}
