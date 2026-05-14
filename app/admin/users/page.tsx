import { UserTable } from "@/components/features/admin/users/UserTable";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="User Management" 
        description="View and manage user roles across the platform." 
      />

      <UserTable />
    </div>
  );
}