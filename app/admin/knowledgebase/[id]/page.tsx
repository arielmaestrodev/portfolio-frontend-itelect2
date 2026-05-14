"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { KnowledgeForm } from "@/components/features/admin/knowledge/KnowledgeForm";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { knowledgeService, KnowledgeEntry } from "@/services/knowledge.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditKnowledgePage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<KnowledgeEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Backend doesn't have a single GET endpoint, so we fetch all and filter
        // Or we check if the controller has a getById.
        // Looking at the routes, it doesn't have a GET /v1/:id.
        // Let's assume we can fetch all and find the one we need for now, 
        // or check the controller again.
        const response = await knowledgeService.getAll();
        if (response.code === 200) {
          const entry = response.data.find((item: KnowledgeEntry) => item.id === id);
          if (entry) {
            setData(entry);
          } else {
            toast.error("Entry not found");
            router.push("/admin/knowledgebase");
          }
        }
      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Edit Knowledge Entry" 
        description="Update the details of your knowledgebase entry."
      />
      <KnowledgeForm initialData={data} />
    </div>
  );
}
