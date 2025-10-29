import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingPaymentsSection() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Payment Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Payment Gateway</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select payment gateway" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="razorpay">Razorpay</SelectItem>
              <SelectItem value="stripe">Stripe</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Merchant ID</Label>
          <Input placeholder="Enter merchant ID" />
        </div>
        <div>
          <Label>Secret Key</Label>
          <Input type="password" placeholder="***********" />
        </div>
        <div className="flex justify-end pt-4">
          <Button>Save Payment Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
