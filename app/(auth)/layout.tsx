import Link from "next/link";
import { Section } from "@/components/common/Section";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 space-y-4">
      <Link href="/" className="text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
        Portfolio
      </Link>
      <Section className="w-full max-w-md !py-0">
        {children}
      </Section>
    </main>
  );
}