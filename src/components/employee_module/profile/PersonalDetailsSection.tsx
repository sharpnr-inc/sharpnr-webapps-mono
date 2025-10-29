import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PersonalDetailsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Rajesh" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Kumar" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="rajesh@example.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+91 9876543210" />
          </div>
        </div>

        <Button className="mt-2">Save Changes</Button>
      </CardContent>
    </Card>
  );
}
