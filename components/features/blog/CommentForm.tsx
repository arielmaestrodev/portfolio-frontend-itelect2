"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { Send, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { blogService } from "@/services/blog.service";
import Link from "next/link";

const formSchema = z.object({
  comment: z.string()
    .min(1, { message: "Comment cannot be empty." })
    .max(1000, { message: "Comment must be at most 1000 characters." }),
});

type FormData = z.infer<typeof formSchema>;

interface CommentFormProps {
  blogId: string;
  onSuccess?: () => void;
}

export function CommentForm({ blogId, onSuccess }: CommentFormProps) {
  const { user, isAuthenticated } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to comment");
      return;
    }

    try {
      const response = await blogService.postComment(blogId, data.comment, user.id);
      
      if (response.code === 201) {
        toast.success("Comment posted successfully!");
        form.reset();
        onSuccess?.();
      } else {
        toast.error(response.message || "Failed to post comment");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred";
      toast.error(message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-muted/30 border border-dashed border-muted-foreground/30 rounded-xl p-8 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <LogIn className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Join the discussion</h3>
          <p className="text-sm text-muted-foreground">Log in to share your thoughts on this post.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/login">Log In to Comment</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="comment"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel htmlFor="comment" className="mb-0">Comment as <span className="text-primary font-semibold">{user?.name}</span></FieldLabel>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {field.value.length}/1000
                </span>
              </div>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="comment"
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="min-h-[120px] resize-none"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
          <Send className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}