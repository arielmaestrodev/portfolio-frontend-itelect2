import { BlogForm } from "@/components/features/admin/blog/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Blog Post</h2>
        <p className="text-muted-foreground">
          Fill in the details to publish a new blog post.
        </p>
      </div>
      <BlogForm />
    </div>
  );
}
