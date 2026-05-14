"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";
import { blogService, BlogPost } from "@/services/blog.service";
import { toast } from "sonner";

// Mock comments as requested
const MOCK_COMMENTS = [
  { id: "c1", author: "Jane Doe", content: "Great article! Very helpful.", date: "2 hours ago" },
  { id: "c2", author: "Bob Smith", content: "I'm excited for the new compiler.", date: "1 day ago" },
];

export default function ViewBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogService.getById(id as string);
        if (response.code === 200) {
          setPost(response.data);
        } else {
          toast.error("Blog post not found");
          router.push("/admin/blog");
        }
      } catch (error) {
        console.error("[ViewBlogPage]", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!post) return null;

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
                <span className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</span>
                <div className="flex gap-2">
                  {post.category?.map(cat => (
                    <Badge key={cat} variant="secondary">{cat}</Badge>
                  ))}
                </div>
              </div>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {post.excerpt && (
                <div className="mb-6 p-4 rounded-lg bg-muted/50 border italic text-muted-foreground">
                  {post.excerpt}
                </div>
              )}
              <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                {post.content}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>Comments ({MOCK_COMMENTS.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_COMMENTS.map((comment, index) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                    {index < MOCK_COMMENTS.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}