import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Developer Portfolio",
    template: "%s | Developer Portfolio",
  },
  description: "A professional portfolio showcasing full-stack development projects and expertise.",
  keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Developer Name" }],
  creator: "Developer Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.example.com",
    siteName: "Developer Portfolio",
    title: "Developer Portfolio",
    description: "A professional portfolio showcasing full-stack development projects and expertise.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Portfolio",
    description: "A professional portfolio showcasing full-stack development projects and expertise.",
    images: ["/og-image.png"],
    creator: "@developer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}