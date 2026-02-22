import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReportsTab = () => {
  const reports = [
    {
      id: 1,
      title: "Monthly Revenue Report",
      period: "February 2024",
      date: "Generated on Feb 22, 2024",
      description: "Comprehensive revenue summary including payments, outstanding amounts, and trends.",
    },
    {
      id: 2,
      title: "Occupancy Report",
      period: "February 2024",
      date: "Generated on Feb 22, 2024",
      description: "Overview of room occupancy rates, vacant units, and tenant status.",
    },
    {
      id: 3,
      title: "Tenant Payment History",
      period: "January - February 2024",
      date: "Generated on Feb 22, 2024",
      description: "Detailed payment records for all tenants including payment dates and methods.",
    },
    {
      id: 4,
      title: "Maintenance Summary",
      period: "February 2024",
      date: "Generated on Feb 22, 2024",
      description: "Summary of all maintenance requests, completion rates, and pending issues.",
    },
  ];

  const generateReport = (title: string) => {
    alert(`Generating: ${title}`);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground mb-8">Generate and download property management reports</p>
      </div>

      {/* Generate New Report Section */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 text-center"
            onClick={() => generateReport("Monthly Revenue Report")}
          >
            <span className="text-lg">📊</span>
            <span className="text-sm font-medium">Revenue</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 text-center"
            onClick={() => generateReport("Occupancy Report")}
          >
            <span className="text-lg">📈</span>
            <span className="text-sm font-medium">Occupancy</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 text-center"
            onClick={() => generateReport("Tenant Payment Report")}
          >
            <span className="text-lg">💳</span>
            <span className="text-sm font-medium">Payments</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 text-center"
            onClick={() => generateReport("Maintenance Report")}
          >
            <span className="text-lg">🔧</span>
            <span className="text-sm font-medium">Maintenance</span>
          </Button>
        </div>
      </div>

      {/* Previous Reports */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">Previous Reports</h2>
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>Period: <span className="text-foreground font-medium">{report.period}</span></span>
                    <span>{report.date}</span>
                  </div>
                </div>
                <Button className="gap-2 w-full sm:w-auto" onClick={() => downloadReport(report.title)}>
                  <Download size={18} /> Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const downloadReport = (title: string) => {
  alert(`Downloading: ${title}`);
};

export default ReportsTab;
