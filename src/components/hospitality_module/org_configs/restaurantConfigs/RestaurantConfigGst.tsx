import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RestaurantConfigGst() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>GST & Tax Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Manage GST details, tax percentages, and related settings.</p>
      </CardContent>
    </Card>
  );
}
