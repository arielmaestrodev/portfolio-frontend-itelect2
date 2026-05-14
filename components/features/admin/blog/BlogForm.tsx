"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const blogSchema = z.object({
  title: z.string({ message: "Title is required" }).min(5, "Title must be at least 5 characters"),
  content: z.string({ message: "Content is required" }).min(20, "Content must be at least 20 characters"),
  excerpt: z.string().optional(),
  category: z.string().optional(),
});

type FormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    excerpt?: string;
    category?: string;
  };
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const form = useForm<FormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      category: initialData?.category || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      category: data.category ? data.category.split(",").map(s => s.trim()) : [],
    };
    console.log("Blog data:", formattedData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(isEditing ? "Blog post updated successfully!" : "Blog post created successfully!");
    router.push("/admin/blog");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input {...field} id="title" placeholder="Blog Title" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            
            <Controller
              name="excerpt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
                  <Input {...field} id="excerpt" placeholder="Short summary" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category">Categories (comma separated)</FieldLabel>
                  <Input {...field} id="category" placeholder="Web, React, Nextjs" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <Textarea {...field} id="content" placeholder="Full blog content..." className="min-h-[200px]" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting 
                ? (isEditing ? "Updating..." : "Creating...") 
                : (isEditing ? "Update Post" : "Create Post")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}