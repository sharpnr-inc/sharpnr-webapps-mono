import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p><strong>Full Name:</strong> Rajesh Kumar</p>
        <p><strong>Position:</strong> Senior Software Engineer</p>
        <p><strong>Department:</strong> Engineering</p>
        <p><strong>Location:</strong> Mumbai, India</p>
      </CardContent>
    </Card>
  );
}
