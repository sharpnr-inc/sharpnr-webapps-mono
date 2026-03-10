import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";

type LegalEntity = {
  id: string;
  name: string;
  type: string;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  gst: string | null;
  cinNumber: string | null;
  panNumber: string | null;
};

export function AccountingLegalEntityPage() {
  const navigate = useNavigate();

  const legalEntities = useAccountingStore((s) => s.legalEntities);
  const setSelectedLegalEntity = useAccountingStore(
    (s) => s.setSelectedLegalEntity,
  );

  return (
    <div className="p-6 space-y-10">
      {/* ================= Hero ================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-primary">Sharp Accounting</span>
        </h1>

        <p className="text-muted-foreground max-w-2xl">
          Manage books, track transactions, and generate financial reports — all
          in one clean, reliable accounting workspace.
        </p>
      </div>

      {/* ================= Legal Entities ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Legal Entity</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legalEntities?.map((entity: LegalEntity, index: number) => {
            return (
              <motion.div
                key={entity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow border-border/60"
                  onClick={() => {
                    // Set selected entity in store
                    setSelectedLegalEntity(entity);

                    navigate({
                      to: "/dashboard/sharp_accounting/overview",
                      search: {
                        entity_id: entity.id,
                        entity_name: entity.name,
                      },
                    });
                  }}
                >
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="bg-primary/10 text-primary p-2 rounded-xl">
                      <Building2 className="size-5" />
                    </div>

                    <CardTitle className="text-base font-semibold">
                      {entity.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />
                      <span>
                        {entity.city}, {entity.state}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        {entity.type}
                      </span>

                      <ArrowRight className="size-4 opacity-60" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
