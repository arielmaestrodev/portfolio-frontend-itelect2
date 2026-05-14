import { KnowledgeTable } from "@/components/features/admin/knowledge/KnowledgeTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";

export default function AdminKnowledgePage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Knowledgebase Management" 
        description="Manage your AI knowledgebase entries here."
      >
        <Link href="/admin/knowledgebase/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </AdminPageHeader>

      <KnowledgeTable />
    </div>
  );
}
