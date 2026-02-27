import { useState } from "react";
import { Info, Building2, CheckCircle2 } from "lucide-react";

type LegalEntity = {
  id: string;
  name: string;
  gst: string;
  address: string;
};

export function RestaurantLegalEntity() {
  const [selectedId, setSelectedId] = useState<string>("1");

  const legalEntities: LegalEntity[] = [
    {
      id: "1",
      name: "Sharp Hospitality Pvt Ltd",
      gst: "08ABCDE1234F1Z5",
      address: "Jaipur, Rajasthan",
    },
    {
      id: "2",
      name: "Sharp Foods LLP",
      gst: "08PQRSX5678K1Z2",
      address: "Udaipur, Rajasthan",
    },
    {
      id: "3",
      name: "Sharp Ventures Pvt Ltd",
      gst: "08LMNOP9876Q1Z8",
      address: "Jodhpur, Rajasthan",
    },
  ];

  return (
    <div className="space-y-4">
      {/* INFO NOTE */}
      <div className="rounded-2xl border bg-blue-50/50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-blue-100 p-2">
            <Info className="h-4 w-4 text-blue-600" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-blue-900">
              What is a Legal Entity?
            </h3>

            <p className="text-sm text-blue-800 leading-relaxed">
              A <span className="font-medium">Legal Entity</span> is the
              officially registered business that owns this restaurant. When you
              assign a legal entity, all restaurant transactions, revenue,
              expenses, and accounting records will be tracked under that
              entity’s accounting books.
            </p>

            <p className="text-sm text-blue-800 leading-relaxed">
              This helps maintain proper accounting, taxation, and compliance
              across multiple restaurants or business units.
            </p>
          </div>
        </div>
      </div>

      {/* IMPORTANT NOTE */}
      <div className="rounded-xl border bg-muted/50 p-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Note:</span> You can
        assign only <span className="font-medium">one legal entity</span> at a
        time. The selected legal entity details will appear on invoices and
        financial records.
      </div>

      {/* LEGAL ENTITY CARDS */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {legalEntities.map((entity) => {
          const selected = entity.id === selectedId;

          return (
            <button
              key={entity.id}
              type="button"
              onClick={() => setSelectedId(entity.id)}
              className={`relative text-left rounded-xl border p-4 transition-all
                ${
                  selected
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/40 hover:bg-muted/40"
                }`}
            >
              {selected && (
                <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-primary" />
              )}

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{entity.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    GST: {entity.gst}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entity.address}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
