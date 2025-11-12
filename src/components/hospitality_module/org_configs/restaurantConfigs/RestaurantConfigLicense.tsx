import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RestaurantConfigLicense() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>License Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Upload and manage restaurant license and permits.</p>
      </CardContent>
    </Card>
  );
}
