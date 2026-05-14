import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/features/blog/BlogPostContent";
import { CommentSection } from "@/components/features/blog/CommentSection";
import { blogService } from "@/services/blog.service";
import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await blogService.getById(slug);
    if (response.code === 200) {
      const post = response.data;
      return {
        title: `${post.title} | My Portfolio`,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
          title: post.title,
          description: post.excerpt,
          type: "article",
        }
      };
    }
  } catch (e) {
    // Silently fail to return default metadata
  }
  
  return {
    title: "Blog Post | My Portfolio",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  let post = null;
  try {
    const response = await blogService.getById(slug);
    if (response.code === 200) {
      post = response.data;
    }
  } catch (error) {
    console.error("Error fetching post detail for SSR:", error);
  }

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <BlogPostContent post={post} />
      <div className="mt-16">
        <CommentSection />
      </div>
    </div>
  );
}