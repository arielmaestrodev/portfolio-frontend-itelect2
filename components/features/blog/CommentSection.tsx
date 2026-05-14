"use client";

import { CommentForm } from "./CommentForm";
import { Separator } from "@/components/ui/separator";

const MOCK_COMMENTS = [
  {
    id: "1",
    author: "Jane Doe",
    date: "May 15, 2026",
    content: "This was a great read! Really enjoyed the insights on Next.js performance.",
    avatar: "JD",
  },
  {
    id: "2",
    author: "John Smith",
    date: "May 16, 2026",
    content: "Very helpful tutorial. Looking forward to more content like this.",
    avatar: "JS",
  },
];

export function CommentSection() {
  return (
    <div className="my-16 space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Comments ({MOCK_COMMENTS.length})</h2>
        <Separator />
      </div>

      <CommentForm />

      <div className="space-y-8">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {comment.avatar}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
