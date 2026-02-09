import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  Smartphone,
  AppWindow,
  CreditCard,
  BarChart2,
  Shield,
  Globe,
  Users2,
  Home,
} from "lucide-react";

export function OrchestratorConsoleIndex() {
  const adminSections = [
    {
      title: "Dashboard",
      description: "Overview of your organization.",
      icon: <Home className="h-8 w-8" />,
    },
    {
      title: "Users",
      description: "Manage users, groups, and organizational units.",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Devices",
      description: "Manage company-owned and user devices.",
      icon: <Smartphone className="h-8 w-8" />,
    },
    {
      title: "Apps",
      description: "Manage and secure your organization's apps.",
      icon: <AppWindow className="h-8 w-8" />,
    },
    {
      title: "Billing",
      description: "Manage subscriptions, payments, and invoices.",
      icon: <CreditCard className="h-8 w-8" />,
    },
    {
      title: "Reports",
      description: "View reports and audit logs for your organization.",
      icon: <BarChart2 className="h-8 w-8" />,
    },
    {
      title: "Security",
      description: "Manage security settings and alerts.",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      title: "Domains",
      description: "Manage your organization's domains.",
      icon: <Globe className="h-8 w-8" />,
    },
    {
      title: "Groups",
      description: "Manage user groups and mailing lists.",
      icon: <Users2 className="h-8 w-8" />,
    },
  ];

  return (
    <div className="p-6">
    

      {/* Main Content */}
      <div className="flex-1">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminSections.map((section) => (
            <Card
              key={section.title}
              className="hover:shadow-[4px_4px_0px_0px_rgba(7,7,2,1)] transition-all cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {section.icon}
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

