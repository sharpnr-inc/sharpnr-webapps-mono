import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingOverviewSection() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Organisation Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Organisation Name</Label>
            <Input placeholder="Sharp Hospitality Pvt. Ltd." />
          </div>
          <div>
            <Label>Contact Email</Label>
            <Input type="email" placeholder="contact@sharphospitality.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" placeholder="+91 9876543210" />
          </div>
          <div>
            <Label>Address</Label>
            <Input placeholder="123 Street, Mumbai, India" />
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
