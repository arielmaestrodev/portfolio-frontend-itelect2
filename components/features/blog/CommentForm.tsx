"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { Send } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  comment: z.string()
    .min(1, { message: "Comment cannot be empty." })
    .max(500, { message: "Comment must be at most 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function CommentForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting comment:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("Comment posted successfully!");
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="comment"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="comment">Leave a comment</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="comment"
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="min-h-[120px] resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/500 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <Send className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}