"use client";

import type React from "react";
import { useAuth } from "./providers/auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const { pending } = useFormStatus();

  const handleSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await login(email, password);

      toast.success("Login successful", {
        description: "You have been logged in successfully.",
      });
    } catch (error) {
      toast.error("Login failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="name@example.com"
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col mt-4 gap-2">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {"Don't have an account?"}{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
