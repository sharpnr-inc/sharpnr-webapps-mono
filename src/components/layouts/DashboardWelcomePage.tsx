import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Building2, Layers, Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface DashboardWelcomePageProps {}

const DashboardWelcomePage: React.FC<DashboardWelcomePageProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome 👋
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Let’s get your property configured and ready. Start by setting up the
          basics, then move on to operations and analytics.
        </p>
      </div>

      <Separator />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Property Setup */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Property Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure floors, rooms, kitchens, bars, and other core property
              details.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate({ to: "/" })}
            >
              Configure Property
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Modules */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Modules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable modules like Hospitality, POS, Inventory, or Accounting
              based on your needs.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate({ to: "/" })}
            >
              Manage Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Organization Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage organization details, users, roles, and permissions.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate({ to: "/" })}
            >
              Open Settings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Hint */}
      <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        💡 Tip: Complete property setup first — most modules depend on floors,
        rooms, and operational units being defined.
      </div>
    </div>
  );
};

export default DashboardWelcomePage;
