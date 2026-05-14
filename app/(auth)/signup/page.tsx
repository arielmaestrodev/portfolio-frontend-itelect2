import { Metadata } from "next";
import { SignupForm } from "@/components/features/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to join our community and stay updated with the latest projects and blog posts.",
};

export default function SignupPage() {
  return <SignupForm />;
}