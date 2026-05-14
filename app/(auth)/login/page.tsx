import { Metadata } from "next";
import { LoginForm } from "@/components/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your account to manage your profile and access exclusive content.",
};

export default function LoginPage() {
  return <LoginForm />;
}