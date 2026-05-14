import { KnowledgeForm } from "@/components/features/admin/knowledge/KnowledgeForm";

export default function NewKnowledgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Knowledge Entry</h2>
        <p className="text-muted-foreground">
          Fill in the details to add a new item to the AI knowledgebase.
        </p>
      </div>
      <KnowledgeForm />
    </div>
  );
}
