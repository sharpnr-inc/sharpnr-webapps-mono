import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RestaurantConfigPayment() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Payment Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Configure payment gateways and UPI integrations here.</p>
      </CardContent>
    </Card>
  );
}
