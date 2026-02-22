import { useState, useMemo } from "react";
import { TrendingUp, Users, Home, DollarSign, CheckCircle2, AlertCircle, Eye, CheckCheck, Wrench, Check, X } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface KPICardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

interface Tenant {
  id: number;
  name: string;
  room: string;
  rent: number;
  status: "Paid" | "Due" | "Overdue";
  lastPayment: string;
}

interface MaintenanceRequest {
  id: string;
  tenantName: string;
  room: string;
  type: "Plumbing" | "Electrical" | "Other";
  status: "Pending" | "In Progress" | "Completed";
  submittedDate: string;
}

const KPICard = ({ icon, title, value, description, iconBgColor, iconColor }: KPICardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl ${iconBgColor} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-medium mb-2">{title}</p>
      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{value}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const DashboardOverview = () => {
  // Mock data
  const initialTenants: Tenant[] = [
    { id: 1, name: "Alice Kipchoge", room: "1A", rent: 45000, status: "Paid", lastPayment: "Feb 22, 2024" },
    { id: 2, name: "Bob Kamau", room: "1B", rent: 45000, status: "Due", lastPayment: "Feb 15, 2024" },
    { id: 3, name: "Carol Kipchoge", room: "2B", rent: 50000, status: "Paid", lastPayment: "Feb 20, 2024" },
    { id: 4, name: "David Kipchoge", room: "3A", rent: 48000, status: "Overdue", lastPayment: "Jan 28, 2024" },
    { id: 5, name: "Emma Kipchoge", room: "3B", rent: 40000, status: "Paid", lastPayment: "Feb 21, 2024" },
    { id: 6, name: "Frank Kipchoge", room: "4A", rent: 52000, status: "Due", lastPayment: "Feb 10, 2024" },
  ];

  const initialMaintenanceRequests: MaintenanceRequest[] = [
    { id: "MR-001", tenantName: "Alice Kipchoge", room: "1A", type: "Plumbing", status: "Pending", submittedDate: "Feb 22, 2024" },
    { id: "MR-002", tenantName: "Bob Kamau", room: "1B", type: "Electrical", status: "In Progress", submittedDate: "Feb 20, 2024" },
    { id: "MR-003", tenantName: "Carol Kipchoge", room: "2B", type: "Other", status: "Pending", submittedDate: "Feb 21, 2024" },
  ];

  // State management
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(initialMaintenanceRequests);

  // Computed values for KPIs
  const kpisData = useMemo(() => {
    const totalCollected = tenants
      .filter((t) => t.status === "Paid")
      .reduce((sum, t) => sum + t.rent, 0);

    const totalUpcoming = tenants
      .filter((t) => t.status === "Due" || t.status === "Overdue")
      .reduce((sum, t) => sum + t.rent, 0);

    const occupied = tenants.length;
    const vacant = 2;
    const occupancyRate = ((occupied / (occupied + vacant)) * 100).toFixed(1);

    const pendingMaintenance = maintenanceRequests.filter((r) => r.status === "Pending").length;
    const inProgressMaintenance = maintenanceRequests.filter((r) => r.status === "In Progress").length;

    return {
      totalCollected,
      totalUpcoming,
      occupied,
      vacant,
      occupancyRate,
      pendingMaintenance,
      inProgressMaintenance,
    };
  }, [tenants, maintenanceRequests]);

  const kpiStats = [
    {
      icon: <DollarSign size={28} />,
      title: "Total Rent Collected",
      value: `KES ${(kpisData.totalCollected / 1000000).toFixed(2)}M`,
      description: `This month (${tenants.filter((t) => t.status === "Paid").length} of ${tenants.length} properties paid)`,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: <Home size={28} />,
      title: "Rooms Occupied / Vacant",
      value: `${kpisData.occupied} / ${kpisData.vacant}`,
      description: `${kpisData.occupancyRate}% occupancy rate`,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Upcoming Rent Due",
      value: `KES ${(kpisData.totalUpcoming / 1000).toFixed(0)}K`,
      description: "Due in the next 7 days",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: <AlertCircle size={28} />,
      title: "Pending Maintenance",
      value: (kpisData.pendingMaintenance + kpisData.inProgressMaintenance).toString(),
      description: `${kpisData.pendingMaintenance} Pending • ${kpisData.inProgressMaintenance} In Progress`,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  // Computed chart data
  const rentCollectionData = useMemo(() => {
    const baseMonth = 1800000;
    const growth = 100000;
    return [
      { month: "Sep", collected: baseMonth, target: baseMonth + 200000 },
      { month: "Oct", collected: baseMonth + growth, target: baseMonth + growth + 150000 },
      { month: "Nov", collected: baseMonth + growth * 2, target: baseMonth + growth * 2 + 100000 },
      { month: "Dec", collected: baseMonth + growth * 3, target: baseMonth + growth * 3 + 50000 },
      { month: "Jan", collected: baseMonth + growth * 4 - 50000, target: baseMonth + growth * 4 },
      { month: "Feb", collected: kpisData.totalCollected, target: baseMonth + growth * 5 },
    ];
  }, [kpisData.totalCollected]);

  const occupancyData = useMemo(() => [
    { name: "Occupied", value: kpisData.occupied, fill: "#0ea5e9" },
    { name: "Vacant", value: kpisData.vacant, fill: "#cbd5e1" },
  ], [kpisData.occupied, kpisData.vacant]);

  // Handler functions for interactivity
  const handleMaintenanceApprove = (id: string) => {
    setMaintenanceRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "In Progress" } : req
      )
    );
  };

  const handleMaintenanceReject = (id: string) => {
    setMaintenanceRequests((prev) =>
      prev.filter((req) => req.id !== id)
    );
  };

  const handlePaymentStatusChange = (tenantId: number) => {
    setTenants((prev) =>
      prev.map((tenant) => {
        if (tenant.id === tenantId) {
          const newStatus = tenant.status === "Paid" ? "Due" : "Paid";
          return { ...tenant, status: newStatus as "Paid" | "Due" | "Overdue" };
        }
        return tenant;
      })
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your property overview.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiStats.map((stat) => (
          <KPICard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rent Collection Trend Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Rent Collection Trend</h3>
            <p className="text-sm text-muted-foreground">Last 6 months comparison</p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rentCollectionData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 90%)" />
                <XAxis dataKey="month" stroke="hsl(220 10% 46%)" />
                <YAxis stroke="hsl(220 10% 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(220 14% 90%)",
                    borderRadius: "0.75rem",
                  }}
                  formatter={(value: number) => `KES ${(value / 1000000).toFixed(1)}M`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="collected"
                  stroke="hsl(224 76% 48%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(224 76% 48%)", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Collected"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(160 59% 40%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(160 59% 40%)", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Occupancy Status Pie Chart */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Room Occupancy Status</h3>
            <p className="text-sm text-muted-foreground">Current distribution</p>
          </div>
          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} rooms`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-foreground">Occupied</span>
              </div>
              <span className="font-semibold text-foreground">26 rooms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-sm text-foreground">Vacant</span>
              </div>
              <span className="font-semibold text-foreground">2 rooms</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-medium text-muted-foreground">Occupancy Rate</span>
              <span className="text-lg font-bold text-primary">{kpisData.occupancyRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Recent Payment Activity</h3>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tenant Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Room</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Payment</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-foreground">{tenant.name}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-muted-foreground font-medium">{tenant.room}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      tenant.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : tenant.status === "Due"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {tenant.status === "Paid" && <CheckCircle2 size={14} />}
                      {tenant.status === "Due" && <AlertCircle size={14} />}
                      {tenant.status === "Overdue" && <AlertCircle size={14} />}
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-muted-foreground">{tenant.lastPayment}</p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handlePaymentStatusChange(tenant.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      {tenant.status === "Paid" ? (
                        <>
                          <Eye size={14} /> Verify
                        </>
                      ) : (
                        <>
                          <CheckCheck size={14} /> Follow Up
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{tenant.name}</p>
                  <p className="text-xs text-muted-foreground">Room {tenant.room}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  tenant.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : tenant.status === "Due"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {tenant.status === "Paid" && <CheckCircle2 size={12} />}
                  {tenant.status === "Due" && <AlertCircle size={12} />}
                  {tenant.status === "Overdue" && <AlertCircle size={12} />}
                  {tenant.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Last Payment: {tenant.lastPayment}</p>
              <button
                onClick={() => handlePaymentStatusChange(tenant.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                {tenant.status === "Paid" ? (
                  <>
                    <Eye size={14} /> View Payment
                  </>
                ) : (
                  <>
                    <CheckCheck size={14} /> Follow Up
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Requests Panel */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Maintenance Requests</h3>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Request ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tenant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Room</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRequests.map((request) => (
                <tr key={request.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-primary">{request.id}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-foreground">{request.tenantName}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-muted-foreground font-medium">{request.room}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      request.type === "Plumbing"
                        ? "bg-blue-100 text-blue-700"
                        : request.type === "Electrical"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : request.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {request.status === "Completed" && <CheckCircle2 size={14} />}
                      {request.status === "In Progress" && <AlertCircle size={14} />}
                      {request.status === "Pending" && <AlertCircle size={14} />}
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleMaintenanceApprove(request.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button
                        onClick={() => handleMaintenanceReject(request.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {maintenanceRequests.map((request) => (
            <div key={request.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-primary mb-1">{request.id}</p>
                  <p className="text-sm font-semibold text-foreground">{request.tenantName}</p>
                  <p className="text-xs text-muted-foreground">Room {request.room}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  request.type === "Plumbing"
                    ? "bg-blue-100 text-blue-700"
                    : request.type === "Electrical"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {request.type}
                </span>
              </div>
              <div className="mb-3 pb-3 border-b border-border">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  request.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : request.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {request.status === "Completed" && <CheckCircle2 size={12} />}
                  {request.status === "In Progress" && <AlertCircle size={12} />}
                  {request.status === "Pending" && <AlertCircle size={12} />}
                  {request.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMaintenanceApprove(request.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Check size={14} /> Approve
                </button>
                <button
                  onClick={() => handleMaintenanceReject(request.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
