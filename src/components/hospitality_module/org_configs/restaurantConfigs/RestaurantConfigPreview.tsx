import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RestaurantConfigPreview() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Restaurant Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This section will show a live preview of your restaurant setup.</p>
      </CardContent>
    </Card>
  );
}
