import { Metadata } from "next";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { AuthGuard } from "@/components/features/auth/AuthGuard";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard mode="ADMIN">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AuthGuard>
  );
}