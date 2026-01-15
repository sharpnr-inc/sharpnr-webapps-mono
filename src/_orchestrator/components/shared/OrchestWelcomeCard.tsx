import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function OrchestWelcomeCard() {
  return (
    <div className="place-items-center flex items-center justify-center p-2">
      <Card className="w-full rounded-2xl shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-semibold">
            Welcome to Sharpnr 👋
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Let’s get your organization ready.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            You’re just a few steps away from setting up your organization.
            Complete the configuration to unlock all features and start managing
            your operations from one place.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
