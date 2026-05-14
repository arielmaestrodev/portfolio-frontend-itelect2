"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* Bar: Logo + nav + ThemeToggle + Menu — always on top, solid background */}
      <div className="relative z-10 container mx-auto flex h-14 items-center justify-between gap-4 bg-background px-4 sm:px-6">
        <Link href="/" className="font-bold text-2xl text-foreground shrink-0">
          Portfolio
        </Link>

        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          <ul className="flex items-center gap-2 lg:gap-4">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground"
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Backdrop: only below the bar, dims the page */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-14 left-0 right-0 bottom-0 z-0 bg-black/50 backdrop-blur-sm"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* Menu panel: below the bar, above the backdrop */}
      {open && (
        <div className="md:hidden relative z-10 border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                        }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2 pt-2 border-t border-border">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}