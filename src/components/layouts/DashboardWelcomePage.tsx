interface DashboardWelcomePageProps {}

const DashboardWelcomePage: React.FC<DashboardWelcomePageProps> = () => {
  return (
    <div className="flex h-full items-center justify-center p-10">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome 👋
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed">
          This application helps you manage your organization, properties, and
          operations from a single place. Configure your setup, enable required
          modules, and streamline day-to-day workflows with clarity and control.
        </p>

        <p className="text-muted-foreground text-sm">
          Use the sidebar to navigate through different sections and begin
          configuring your system.
        </p>
      </div>
    </div>
  );
};

export default DashboardWelcomePage;
