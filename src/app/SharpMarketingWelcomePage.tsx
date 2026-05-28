import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import {
  Megaphone,
  Target,
  TrendingUp,
  Mail,
  BarChart3,
  ArrowRight,
} from "lucide-react";

interface SharpMarketingWelcomePageProps {}

const SharpMarketingWelcomePage: React.FC<
  SharpMarketingWelcomePageProps
> = () => {
  return (
    <div className="p-6 space-y-10">
      {/* ================= Hero ================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-primary">Sharp Marketing</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Plan campaigns, track performance, and grow your brand with clarity
          and confidence.
        </p>
      </div>

      {/* ================= Key Areas ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Megaphone className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create, manage, and monitor marketing campaigns.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Target className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Segment users and target the right audience.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Mail className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Email & Outreach</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Run email, SMS, and outreach workflows.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <TrendingUp className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track conversions, funnels, and growth metrics.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Analyze performance and campaign ROI.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* ================= Getting Started ================= */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Launch your first marketing initiatives in minutes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">1. Define your audience and goals</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">2. Create your first campaign</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">3. Track performance and optimize</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <Button className="mt-4 w-fit">Create First Campaign</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharpMarketingWelcomePage;
