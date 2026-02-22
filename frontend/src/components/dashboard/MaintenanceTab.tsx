import { Plus, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const MaintenanceTab = () => {
  const requests = [
    {
      id: 1,
      title: "Leaking tap in bathroom",
      room: "1A",
      tenant: "Alice Kipchoge",
      priority: "High",
      status: "In Progress",
      submittedDate: "Feb 20, 2024",
      dueDate: "Feb 23, 2024",
      description: "The main bathroom tap is leaking water constantly.",
    },
    {
      id: 2,
      title: "Door lock not working",
      room: "2B",
      tenant: "Carol Kipchoge",
      priority: "Critical",
      status: "Pending",
      submittedDate: "Feb 22, 2024",
      dueDate: "Feb 24, 2024",
      description: "Main door lock is jammed and cannot be opened.",
    },
    {
      id: 3,
      title: "Paint touch-up needed",
      room: "1B",
      tenant: "Bob Kamau",
      priority: "Low",
      status: "Pending",
      submittedDate: "Feb 15, 2024",
      dueDate: "Mar 05, 2024",
      description: "Wall has some scuff marks that need paint touch-up.",
    },
    {
      id: 4,
      title: "Electrical outlet not working",
      room: "3A",
      tenant: "David Kipchoge",
      priority: "High",
      status: "Completed",
      submittedDate: "Feb 10, 2024",
      dueDate: "Feb 15, 2024",
      description: "One outlet in the living room is not functioning.",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-blue-100 text-blue-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "In Progress":
        return <Clock size={16} className="text-blue-600" />;
      case "Pending":
        return <AlertCircle size={16} className="text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Maintenance Requests</h1>
          <p className="text-muted-foreground">Manage property maintenance and repair requests</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus size={18} /> New Request
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">4</p>
          <p className="text-xs text-muted-foreground">Total Requests</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">2</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">1</p>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">1</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Requests Cards */}
      <div className="grid grid-cols-1 gap-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{request.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs">
                    <span className="text-muted-foreground">Room:</span>{" "}
                    <span className="font-medium text-foreground">{request.room}</span>
                  </span>
                  <span className="text-xs">
                    <span className="text-muted-foreground">Tenant:</span>{" "}
                    <span className="font-medium text-foreground">{request.tenant}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap sm:flex-col sm:items-end">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)} {request.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                <p className="text-sm font-medium text-foreground">{request.submittedDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                <p className="text-sm font-medium text-foreground">{request.dueDate}</p>
              </div>
              <button className="sm:col-span-1 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium">
                Update
              </button>
              <button className="sm:col-span-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTab;
