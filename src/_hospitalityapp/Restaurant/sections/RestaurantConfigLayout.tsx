import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RestaurantConfigLayout() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Layout Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Configure the restaurant layout and seating plan.</p>
      </CardContent>
    </Card>
  );
}
