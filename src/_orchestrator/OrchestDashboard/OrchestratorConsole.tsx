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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold">Admin</h1>
        </div>
        <nav className="mt-6">
          {adminSections.map((section) => (
            <a
              key={section.title}
              href="#"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              {section.icon && (
                <div className="w-8 h-8 mr-3">{section.icon}</div>
              )}
              <span>{section.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Console</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminSections.map((section) => (
            <Card
              key={section.title}
              className="hover:shadow-lg transition-shadow cursor-pointer"
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

