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
    // Hydrate state from localStorage on initial load
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
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
        isAdmin: user?.role === "ADMIN",
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