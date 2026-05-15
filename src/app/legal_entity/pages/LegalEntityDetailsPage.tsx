import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Verified } from "lucide-react";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";

interface LegalEntityDetailsPageProps {}

const LegalEntityDetailsPage: React.FC<LegalEntityDetailsPageProps> = ({}) => {
  const {} = Route.useParams();

  return (
    <div className="p-2 space-y-2">
      <div className="space-y-1">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-semibold tracking-tight">
            Legal Entity Name Pvt Ltd
          </h2>

          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            <Verified className="h-4 w-4" />
            Sharpnr Verified
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          India, Rajasthan, Jaipur
        </p>
      </div>

      <Separator />

      <div className="w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Doc&Certificates</TabsTrigger>
            <TabsTrigger value="tax_registration">Tax Registration</TabsTrigger>
            <TabsTrigger value="settings">General Settings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="border p-2"></TabsContent>

          <TabsContent value="documents" className="border p-2"></TabsContent>

          <TabsContent value="tax_registration" className=" p-2"></TabsContent>

          <TabsContent value="settings"></TabsContent>
          <TabsContent value="settings"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LegalEntityDetailsPage;
