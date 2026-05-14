import Link from "next/link";
import { BlogPost } from "@/constants/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { Section } from "@/components/common/Section";

interface BlogDateContentProps {
  segments: string[];
  filteredPosts: BlogPost[];
  year?: string;
  month?: string;
}

export function BlogDateContent({ segments, filteredPosts, year, month }: BlogDateContentProps) {
  const getLabel = () => {
    if (!year) return "Archive";
    if (!month) return `Year: ${year}`;
    return `Archive: ${month}/${year}`;
  };

  return (
    <Section className="py-12">
      <Link 
        href="/blog" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl font-bold">{getLabel()}</h1>
        <p className="text-muted-foreground">
          Showing results for <span className="font-semibold text-foreground underline decoration-primary decoration-2">{segments.join(" / ") || "all time"}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-primary transition-all group bg-card shadow-sm hover:shadow-md">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl font-bold">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {post.category?.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-3xl bg-muted/20">
            <p className="text-muted-foreground italic">No articles found for this period.</p>
          </div>
        )}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-purple-500/5 border border-purple-500/20">
        <h3 className="text-lg font-semibold mb-2">How this works:</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This page uses an <code className="bg-muted p-1 rounded font-mono text-purple-500">[[...slug]]</code> (Optional Catch-all) route. 
          It captures all segments after <code className="bg-muted p-1 rounded font-mono">/blog/date/</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background rounded-lg border">
            <p className="text-xs font-mono text-muted-foreground mb-1">URL:</p>
            <p className="text-sm font-mono break-all text-purple-500">/blog/date/{segments.join("/")}</p>
          </div>
          <div className="p-4 bg-background rounded-lg border">
            <p className="text-xs font-mono text-muted-foreground mb-1">Params Object:</p>
            <pre className="text-xs font-mono">{JSON.stringify({ slug: segments }, null, 2)}</pre>
          </div>
        </div>
      </div>
    </Section>
  );
}
