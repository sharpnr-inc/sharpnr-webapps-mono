import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RestaurantConfigCharges() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Service & Extra Charges</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Set up delivery fees, service charges, and additional costs.</p>
      </CardContent>
    </Card>
  );
}
