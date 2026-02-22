import { Plus, Mail, Phone, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TenantsTab = () => {
  const tenants = [
    {
      id: 1,
      name: "Alice Kipchoge",
      phone: "+254 712 345 678",
      email: "alice@example.com",
      room: "1A",
      moveInDate: "Jan 15, 2024",
      leaseExpiry: "Jan 14, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Kamau",
      phone: "+254 723 456 789",
      email: "bob@example.com",
      room: "1B",
      moveInDate: "Mar 01, 2023",
      leaseExpiry: "Feb 28, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Carol Kipchoge",
      phone: "+254 734 567 890",
      email: "carol@example.com",
      room: "2B",
      moveInDate: "Jun 10, 2024",
      leaseExpiry: "Jun 09, 2025",
      status: "Active",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Tenants</h1>
          <p className="text-muted-foreground">View and manage all tenant information</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus size={18} /> Add Tenant
        </Button>
      </div>

      {/* Tenants Table - Desktop */}
      <div className="hidden md:block bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Room</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Lease Expiry</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{tenant.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{tenant.phone}</p>
                  <p className="text-sm text-muted-foreground">{tenant.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{tenant.room}</td>
                <td className="px-6 py-4 text-sm text-foreground">{tenant.leaseExpiry}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {tenant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tenants Cards - Mobile */}
      <div className="md:hidden grid gap-6">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{tenant.name}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {tenant.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-muted-foreground" />
                <p className="text-muted-foreground">{tenant.phone}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-muted-foreground" />
                <p className="text-muted-foreground">{tenant.email}</p>
              </div>
              <p className="text-sm"><span className="text-muted-foreground">Room:</span> <span className="font-medium text-foreground">{tenant.room}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Lease Expiry:</span> <span className="font-medium text-foreground">{tenant.leaseExpiry}</span></p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium">
                Edit
              </button>
              <button className="px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantsTab;
