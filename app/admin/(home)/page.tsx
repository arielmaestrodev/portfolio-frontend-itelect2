import { Metadata } from "next";
import { StatsCard } from "@/components/features/admin/StatsCard";
import { Eye, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Overview of your portfolio analytics and content.",
};

export default function AdminDashboardPage() {
  // Mock data
  const stats = [
    {
      title: "Page Visited",
      value: "1,234",
      icon: Eye,
      description: "+12% from last month",
    },
    {
      title: "Total Blogs",
      value: "12",
      icon: FileText,
      description: "2 new this week",
    },
    {
      title: "Total Knowledgebase",
      value: "45",
      icon: Lightbulb,
      description: "Knowledge items for AI",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="Overview" 
        description="Welcome back! Here's what's happening with your portfolio." 
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recently Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", email: "john@example.com", date: "2 hours ago" },
                { name: "Alice Smith", email: "alice@example.com", date: "5 hours ago" },
                { name: "Bob Johnson", email: "bob@example.com", date: "1 day ago" },
              ].map((user) => (
                <div key={user.email} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{user.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
