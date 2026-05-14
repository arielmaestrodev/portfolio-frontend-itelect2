"use client";

import { useState, useEffect, useCallback } from "react";
import { CommentForm } from "./CommentForm";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Trash2, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
  };
}

interface CommentSectionProps {
  blogId: string;
  blogAuthorId: string;
}

export function CommentSection({ blogId, blogAuthorId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const fetchComments = useCallback(async () => {
    try {
      const response = await blogService.getComments(blogId);
      if (response.status === "success") {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setIsLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleDelete = async (commentId: string) => {
    if (!user) return;
    
    try {
      const response = await blogService.deleteComment(commentId, user.id);
      if (response.status === "success") {
        toast.success("Comment deleted");
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete comment";
      toast.error(message);
    }
  };

  return (
    <div className="my-16 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Discussion ({comments.length})</h2>
        </div>
        <Separator />
      </div>

      <CommentForm blogId={blogId} onSuccess={fetchComments} />

      <div className="space-y-8 mt-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const isOwner = user?.id === comment.userId;
            const isBlogOwner = user?.id === blogAuthorId;
            const isAdmin = user?.role === "ADMIN";
            const canDelete = isOwner || isBlogOwner || isAdmin;

            return (
              <div key={comment.id} className="group flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {comment.user.name}
                        {comment.userId === blogAuthorId && (
                          <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded uppercase font-bold tracking-wider">Author</span>
                        )}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="bg-muted/30 rounded-2xl rounded-tl-none p-4 border border-muted-foreground/5 shadow-sm">
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}