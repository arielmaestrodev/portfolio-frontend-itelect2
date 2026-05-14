import { Metadata } from "next";
import { BlogLandingContent } from "@/components/features/blog/BlogLandingContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest articles on web development, technology trends, and coding best practices.",
};

export default function BlogLandingPage() {
  return <BlogLandingContent />;
}