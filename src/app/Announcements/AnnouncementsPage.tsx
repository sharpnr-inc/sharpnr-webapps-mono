import { Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Announcement = {
  id: string;
  title: string;
  message: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
};

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Office Closed on Friday",
    message:
      "Due to maintenance work, the office will remain closed this Friday.",
    priority: "high",
    createdAt: "Apr 28, 2026",
  },
  {
    id: "2",
    title: "New HR Policies Released",
    message:
      "Please review the updated HR handbook available in the documents section.",
    priority: "medium",
    createdAt: "Apr 26, 2026",
  },
];

function getPriorityColor(priority: Announcement["priority"]) {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50";
    case "medium":
      return "text-yellow-600 bg-yellow-50";
    default:
      return "text-green-600 bg-green-50";
  }
}

export function AnnouncementsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">Announcements 📢</h1>
        </div>

        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Announcement
        </Button>
      </div>

      {/* Announcement List */}
      {announcements.length === 0 ? (
        <div className="text-center text-muted-foreground mt-20">
          No announcements available 🚫
        </div>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    {announcement.title}
                  </h2>

                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${getPriorityColor(
                      announcement.priority,
                    )}`}
                  >
                    {announcement.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm">
                  {announcement.message}
                </p>

                <p className="text-xs text-gray-400">
                  {announcement.createdAt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
