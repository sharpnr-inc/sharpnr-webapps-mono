import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsUserSection() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Add or remove users in your organisation.
          </p>
          <Button>Add User</Button>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-muted-foreground text-sm text-center">
            No users added yet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
