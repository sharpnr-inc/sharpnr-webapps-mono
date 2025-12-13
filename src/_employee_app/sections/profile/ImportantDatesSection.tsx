import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImportantDatesSection() {
  const dates = [
    { label: "Date of Joining", value: "12 Jan 2020" },
    { label: "Last Promotion", value: "05 Mar 2023" },
    { label: "Next Appraisal", value: "10 Jan 2025" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Dates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {dates.map((d, i) => (
          <div key={i} className="flex justify-between border-b pb-2">
            <span className="font-medium">{d.label}</span>
            <span className="text-muted-foreground">{d.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
