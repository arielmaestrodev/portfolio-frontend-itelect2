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

const knowledgeSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().optional(),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof knowledgeSchema>;

export function KnowledgeForm() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      tags: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(",").map(s => s.trim()) : [],
    };
    console.log("Knowledge data:", formattedData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Knowledge item created successfully!");
    router.push("/admin/knowledgebase");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Knowledge Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="question"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="question">Question</FieldLabel>
                  <Input {...field} id="question" placeholder="e.g. What is Next.js?" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Input {...field} id="category" placeholder="e.g. General, Design, Backend" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
                  <Input {...field} id="tags" placeholder="nextjs, react, frontend" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="answer"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="answer">Answer</FieldLabel>
                  <Textarea {...field} id="answer" placeholder="The answer to the question..." className="min-h-[150px]" />
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
              {form.formState.isSubmitting ? "Creating..." : "Create Entry"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}