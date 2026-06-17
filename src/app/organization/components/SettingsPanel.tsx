import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
} from "@sharpnr/ui";
import { ORG } from "./orgData";

export function SettingsPanel() {
  const [orgName, setOrgName] = useState(ORG.name);
  const [email, setEmail] = useState("admin@sunrisehospitality.in");

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Organization details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Organization name</Label>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Domain</Label>
              <Input value={ORG.domain} readOnly className="bg-muted/50 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Headquarters</Label>
              <Input value="Jaipur, Rajasthan, India" readOnly className="bg-muted/50 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Plan</Label>
              <Input value={ORG.plan} readOnly className="bg-muted/50 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Primary contact email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-destructive">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">Delete organization</p>
            <p className="text-xs text-muted-foreground">
              Permanently removes all data. This cannot be undone.
            </p>
          </div>
          <Button variant="destructive" size="sm" className="shrink-0">
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
