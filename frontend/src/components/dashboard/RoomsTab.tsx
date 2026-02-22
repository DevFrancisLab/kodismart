import { Plus, Edit2, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const RoomsTab = () => {
  const rooms = [
    {
      id: 1,
      name: "Room 1A",
      property: "Downtown Apartments",
      tenant: "Alice Kipchoge",
      rent: "KES 45,000",
      status: "Occupied",
      lastPayment: "2 days ago",
    },
    {
      id: 2,
      name: "Room 1B",
      property: "Downtown Apartments",
      tenant: "Bob Kamau",
      rent: "KES 45,000",
      status: "Occupied",
      lastPayment: "1 week ago",
    },
    {
      id: 3,
      name: "Room 2A",
      property: "Westlands Complex",
      tenant: "Vacant",
      rent: "KES 50,000",
      status: "Vacant",
      lastPayment: "N/A",
    },
    {
      id: 4,
      name: "Room 2B",
      property: "Westlands Complex",
      tenant: "Carol Kipchoge",
      rent: "KES 50,000",
      status: "Occupied",
      lastPayment: "Yesterday",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Rooms</h1>
          <p className="text-muted-foreground">Manage all your properties and rooms</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus size={18} /> Add Room
        </Button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
                <p className="text-sm text-muted-foreground">{room.property}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  room.status === "Occupied"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {room.status}
              </span>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground">Tenant</p>
                <p className="text-sm font-medium text-foreground">{room.tenant}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly Rent</p>
                <p className="text-lg font-bold text-primary">{room.rent}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Payment</p>
                <p className="text-sm text-foreground">{room.lastPayment}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Edit2 size={16} /> Edit
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

export default RoomsTab;
