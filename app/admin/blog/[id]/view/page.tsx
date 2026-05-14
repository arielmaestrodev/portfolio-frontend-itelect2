import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ViewBlogPage({ params }: { params: { id: string } }) {
  // Mock data
  const post = {
    id: params.id,
    title: "React 19 New Features",
    content: "Full content of the blog post goes here... It explains the new features of React 19 in detail, including the new hooks and compiler improvements.",
    date: "2026-05-14",
    categories: ["Web Development", "React"],
    comments: [
      { id: "c1", author: "Jane Doe", content: "Great article! Very helpful.", date: "2 hours ago" },
      { id: "c2", author: "Bob Smith", content: "I'm excited for the new compiler.", date: "1 day ago" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{post.title}</h2>
          <p className="text-muted-foreground">View post details and comments.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <div className="flex gap-2">
                  {post.categories.map(cat => (
                    <Badge key={cat} variant="secondary">{cat}</Badge>
                  ))}
                </div>
              </div>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {post.content}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>Comments ({post.comments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {post.comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No comments yet.</p>
                ) : (
                  post.comments.map((comment, index) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                      {index < post.comments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}