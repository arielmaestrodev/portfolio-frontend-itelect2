import { Metadata } from "next";
import { BlogLandingContent } from "@/components/features/blog/BlogLandingContent";
import { blogService } from "@/services/blog.service";

// This makes the page SSR by default in Next.js 14/15
export const metadata: Metadata = {
  title: "Blog | My Portfolio",
  description: "Read my latest articles on web development, technology trends, and coding best practices.",
};

async function getPosts() {
  try {
    // We can use the service or a direct fetch for SSR
    // blogService uses axios with baseURL, which works on server if properly configured
    const response = await blogService.getAll();
    return response.code === 200 ? response.data : [];
  } catch (error) {
    console.error("Error fetching blogs for SSR:", error);
    return [];
  }
}

export default async function BlogLandingPage() {
  const posts = await getPosts();
  
  return <BlogLandingContent posts={posts} />;
}