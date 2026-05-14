"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BlogForm } from "@/components/features/admin/blog/BlogForm";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { blogService, BlogPost } from "@/services/blog.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await blogService.getById(id as string);
        if (response.code === 200) {
          setData(response.data);
        } else {
          toast.error("Post not found");
          router.push("/admin/blog");
        }
      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Edit Blog Post" 
        description="Modify the details of your blog post." 
      />
      <BlogForm initialData={data} />
    </div>
  );
}