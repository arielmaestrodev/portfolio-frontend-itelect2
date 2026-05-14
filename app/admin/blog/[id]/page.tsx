import { BlogForm } from "@/components/features/admin/blog/BlogForm";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  // Mock data fetching
  const mockPost = {
    id: params.id,
    title: "Mastering Tailwind CSS",
    content: "This is a long content about mastering tailwind css and its utilities. It should be at least 20 characters long.",
    excerpt: "Learn how to use Tailwind effectively.",
    category: "Design, Tailwind",
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Edit Blog Post" 
        description="Modify the details of your blog post." 
      />
      <BlogForm initialData={mockPost} />
    </div>
  );
}