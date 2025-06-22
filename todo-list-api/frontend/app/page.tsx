import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Todo App</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your tasks efficiently with our simple todo application
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
