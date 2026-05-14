"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  mode?: "GUEST" | "ADMIN" | "PRIVATE";
}

export function AuthGuard({ children, mode = "PRIVATE" }: AuthGuardProps) {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (mode === "GUEST" && isAuthenticated) {
      // Redirect logged-in users away from guest pages
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else if (mode === "ADMIN" && !isAdmin) {
      // Redirect non-admins away from admin pages
      if (isAuthenticated) {
        router.push("/");
      } else {
        router.push("/login");
      }
    } else if (mode === "PRIVATE" && !isAuthenticated) {
      // Redirect unauthenticated users away from private pages
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, isAdmin, mode, router]);

  // Show loading while checking auth or if redirecting
  if (isLoading || 
     (mode === "GUEST" && isAuthenticated) || 
     (mode === "ADMIN" && !isAdmin) || 
     (mode === "PRIVATE" && !isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
