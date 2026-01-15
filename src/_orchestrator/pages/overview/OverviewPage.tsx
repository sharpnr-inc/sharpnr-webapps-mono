import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function OverviewPage() {
  return (
    <div className="p-4 space-y-2">
      {/* Page Header */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Overview</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            The Orchestrator is the control center of your organization. From
            here, you can manage multiple properties, monitor business
            performance, and gain insights into growth — all in one unified
            view.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Organization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organization Summary</CardTitle>
          <CardDescription>
            Core information and verification status of your organization.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Organization Name */}
            <div>
              <p className="text-xs text-muted-foreground">Organization</p>
              <p className="font-medium">XYZ Pvt Ltd</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-muted-foreground">Primary Email</p>
              <div className="flex items-center gap-2">
                <span className="font-medium">somecompany101@example.com</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs text-muted-foreground">Contact Number</p>
              <p className="font-medium">+91 98288 23314</p>
            </div>
          </div>

          {/* Address Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t pt-4">
            {/* Address Line */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>

            {/* City */}
            <div>
              <p className="text-xs text-muted-foreground">City</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>

            {/* State */}
            <div>
              <p className="text-xs text-muted-foreground">State</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>

            {/* Country */}
            <div>
              <p className="text-xs text-muted-foreground">Country</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          To get started, configure the main Orchestrator. This step is required
          before managing properties, users, and modules.
        </CardFooter>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link to="/orchestrator/configurations">
              Continue Orchestrator Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Super Admin Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Super Admin Access</CardTitle>
          <CardDescription>
            Highest level of administrative control within the organization.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Super Admins have full access to all organizational settings,
            properties, and critical configurations. This role is reserved for
            trusted users responsible for overseeing the entire business
            structure and governance.
          </p>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500" />
              Only a Super Admin can create, assign, or promote another user to
              Super Admin.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500" />
              Super Admin access cannot be modified by standard administrators
              or employees.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500" />
              This role ensures security, accountability, and controlled access
              to sensitive operations.
            </li>
          </ul>

          <div className="pt-2">
            <Badge variant="outline" className="text-xs">
              Restricted Role
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
