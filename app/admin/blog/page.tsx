import { BlogTable } from "@/components/features/admin/blog/BlogTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Blog Management" 
        description="Manage your blog posts here."
      >
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </AdminPageHeader>

      <BlogTable />
    </div>
  );
}
