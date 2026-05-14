"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, LoginInput, SignupInput } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  signup: (data: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          // Hydrate state from localStorage
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);

          // Verify session with backend
          const response = await authService.getMe();
          if (response.code !== 200) {
            throw new Error("Session invalid");
          }
          // Update user data with latest from server
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (e: any) {
          console.error("Session verification failed", e);

          // Only clear session if it's a definitive auth failure (401/403)
          const status = e.response?.status;
          if (status === 401 || status === 403) {
            setUser(null);
            localStorage.removeItem("user");
          }
          console.log("[AuthContext]]", e)
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (data: LoginInput) => {
    try {
      const response = await authService.login(data);
      if (response.code === 200) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Role-based redirection
        if (userData.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred";
      toast.error(message);
      throw error;
    }
  };

  const signup = async (data: SignupInput) => {
    try {
      const response = await authService.signup(data);
      if (response.code === 201 || response.code === 200) {
        router.push("/login");
      } else {
        toast.error(response.message || "Signup failed");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred";
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role?.toUpperCase() === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}