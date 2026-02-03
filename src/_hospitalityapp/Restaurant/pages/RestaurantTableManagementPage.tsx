import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogModal } from "@/context/DialogModalContext";

interface RestaurantTableManagementPageProps {}

type TableStatus = "available" | "occupied";

interface RestaurantTable {
  id: number;
  name: string;
  status: TableStatus;
}

const tables: RestaurantTable[] = [
  { id: 1, name: "T1", status: "available" },
  { id: 2, name: "T2", status: "occupied" },
  { id: 3, name: "T3", status: "available" },
  { id: 4, name: "T4", status: "occupied" },
  { id: 5, name: "T5", status: "available" },
  { id: 6, name: "T6", status: "available" },
];

const RestaurantTableManagementPage: React.FC<
  RestaurantTableManagementPageProps
> = () => {
  const { openModal } = useDialogModal();

  const handleCreateSession = (table: RestaurantTable) => {
    if (table.status == "occupied") {
      return;
    } else {
      openModal(<CreateTableSessionForm table={table} />);
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Table Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor table availability and active dining sessions.
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-green-500" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          Occupied
        </div>
      </div>

      {/* Floor Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleCreateSession(table)}
            className={`
              aspect-square rounded-lg border
              flex items-center justify-center
              font-medium cursor-pointer
              transition hover:scale-[1.02]
              ${
                table.status === "available"
                  ? "bg-green-500/10 border-green-500 text-green-700"
                  : "bg-red-500/10 border-red-500 text-red-700"
              }
            `}
          >
            <div className="text-center">
              <div className="text-lg">{table.name}</div>
              <div className="text-xs opacity-70">
                {table.status === "available" ? "Available" : "Session Ongoing"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantTableManagementPage;

interface CreateTableSessionFormProp {
  table: RestaurantTable;
}
function CreateTableSessionForm({}: CreateTableSessionFormProp) {
  return (
    <div className="space-y-2">
      <Label>Customer Name</Label>
      <Input />
      
      <Button>Create Session</Button>
    </div>
  );
}
