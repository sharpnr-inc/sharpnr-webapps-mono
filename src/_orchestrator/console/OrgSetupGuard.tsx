import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Scale } from "lucide-react";
import { useOrganizationStatus } from "../api/general";
import { useFormsModal } from "@/context/FormModalContext";
import AddPropertyForm from "../properties/property/forms/AddPropertyForm";
import CreateLegalEntityForm from "../legal_entity/CreateLegalEntityForm";

export default function OrganizationSetupGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useOrganizationStatus();

  const notConfigured = data?.data?.setup_completed === "NOT_CONFIGURED";

  if (!notConfigured) return <>{children}</>;

  const { showModal, closeModal } = useFormsModal();

  const handleAddProperty = () => {
    showModal(
      "Add Property",
      "create Property in the organization",
      <AddPropertyForm
        closeModal={closeModal}
        navigate={"/orchestrator/property"}
      />,
    );
  };

  const handleCreateLE = () => {
    showModal(
      "Create legal Entity",
      "Here you can Create Legal Entity",
      <CreateLegalEntityForm
        closeModal={closeModal}
        nav={"/orchestrator/legal_entity"}
      />,
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl space-y-6"
      >
        {/* Welcome / Instruction */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome to SharpNR 👋
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            To continue, please complete your organization setup. Create at
            least one{" "}
            <span className="font-medium text-foreground">Property</span> Or one{" "}
            <span className="font-medium text-foreground">Legal Entity</span>.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* Create Property */}
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Create Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Start by creating your first property to continue setup.
              </p>
              <Button className="w-full" onClick={handleAddProperty}>
                Create Property
              </Button>
            </CardContent>
          </Card>

          {/* Create Legal Entity */}
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Create Legal Entity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add your legal entity information to finish organization setup.
              </p>
              <Button className="w-full" onClick={handleCreateLE}>
                Create Legal Entity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
