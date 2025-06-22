import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/providers/auth-provider";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/lib/constants/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "A simple todo application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.COOKIES.ACCESS_TOKEN)?.value;
  const isAuthenticated = !!token;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider initialAuth={isAuthenticated}>
            {children}
            <Toaster />
          </AuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
