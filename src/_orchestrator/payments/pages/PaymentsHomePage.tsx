import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

/* -------------------------------------------------------------------------- */
/* Types */
/* -------------------------------------------------------------------------- */

type Provider = "PHONEPE" | "RAZORPAY" | "CASH";

interface LegalEntity {
  id: string;
  name: string;
  gstin: string;
  state: string;
}

interface PaymentAccount {
  id: string;
  legalEntityID: string;
  accountRef: string;
  currencyCode: string;
  isActive: boolean;
}

interface GatewayConfig {
  id: string;
  providerCode: Provider;
  displayName: string;
  isTestMode: boolean;
  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/* Mock Data */
/* -------------------------------------------------------------------------- */

const LEGAL_ENTITIES: LegalEntity[] = [
  {
    id: "le-mh",
    name: "Acme Hotels MH",
    gstin: "27AABCA1234C1Z5",
    state: "Maharashtra",
  },
  {
    id: "le-dl",
    name: "Acme Hotels DL",
    gstin: "07AABCA1234C1Z5",
    state: "Delhi",
  },
];

const MOCK_ACCOUNTS: PaymentAccount[] = [
  {
    id: "acc-1",
    legalEntityID: "le-mh",
    accountRef: "acme-hotels-mh",
    currencyCode: "INR",
    isActive: true,
  },
];

const MOCK_GATEWAYS: Record<string, GatewayConfig[]> = {
  "acc-1": [
    {
      id: "gw-1",
      providerCode: "PHONEPE",
      displayName: "PhonePe",
      isTestMode: false,
      isActive: true,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Gateway metadata */
/* -------------------------------------------------------------------------- */

const GW_META = {
  PHONEPE: {
    short: "PhPe",
    label: "PhonePe",
  },
  RAZORPAY: {
    short: "Rzpy",
    label: "Razorpay",
  },
  CASH: {
    short: "Cash",
    label: "Cash",
  },
} satisfies Record<
  Provider,
  {
    short: string;
    label: string;
  }
>;

/* -------------------------------------------------------------------------- */
/* Account Card */
/* -------------------------------------------------------------------------- */

function AccountCard({
  account,
  le,
  selected,
  onClick,
}: {
  account: PaymentAccount;
  le?: LegalEntity;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl border p-5 transition
        ${
          selected
            ? "border-primary ring-2 ring-primary/20"
            : "border-muted hover:border-primary/40"
        }
      `}
    >
      <span className="inline-block text-xs font-mono bg-muted px-2 py-1 rounded mb-2">
        {le?.state ?? "Unknown"}
      </span>

      <div className="text-sm font-semibold">
        {le?.name ?? account.accountRef}
      </div>

      <div className="text-xs text-muted-foreground font-mono mb-3">
        {le?.gstin ?? "—"}
      </div>

      <div className="flex justify-between text-xs">
        <span className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              account.isActive ? "bg-green-600" : "bg-muted"
            }`}
          />
          {account.isActive ? "Active" : "Inactive"}
        </span>

        <span className="font-mono text-muted-foreground">
          {account.currencyCode}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gateway Row */
/* -------------------------------------------------------------------------- */

function GatewayRow({
  gw,
  onRemove,
  onToggle,
}: {
  gw: GatewayConfig;
  onRemove: () => void;
  onToggle: (v: boolean) => void;
}) {
  const meta = GW_META[gw.providerCode];

  const badgeVariant =
    gw.providerCode === "CASH"
      ? "secondary"
      : gw.isTestMode
        ? "outline"
        : "default";

  const badgeText =
    gw.providerCode === "CASH" ? "offline" : gw.isTestMode ? "test" : "live";

  return (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-muted/40">
      <div className="w-9 h-9 rounded-md border bg-background flex items-center justify-center text-xs font-mono">
        {meta.short}
      </div>

      <div className="flex-1">
        <div className="text-sm font-semibold">{gw.displayName}</div>
        <div className="text-xs text-muted-foreground font-mono">
          {gw.providerCode}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={badgeVariant}>{badgeText}</Badge>

        <Switch checked={gw.isActive} onCheckedChange={onToggle} />

        <Button variant="destructive" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Page */
/* -------------------------------------------------------------------------- */

export function PaymentsHomePage() {
  const [accounts, setAccounts] = useState<PaymentAccount[]>(MOCK_ACCOUNTS);

  const [gateways, setGateways] =
    useState<Record<string, GatewayConfig[]>>(MOCK_GATEWAYS);

  const [selected, setSelected] = useState<PaymentAccount | null>(null);

  const [createOpen, setCreateOpen] = useState(false);

  const leMap = Object.fromEntries(LEGAL_ENTITIES.map((le) => [le.id, le]));

  const currentGWs = selected ? (gateways[selected.id] ?? []) : [];

  const removeGateway = (gwID: string) => {
    if (!selected) return;

    setGateways((prev) => ({
      ...prev,
      [selected.id]: prev[selected.id].filter((g) => g.id !== gwID),
    }));
  };

  const toggleGateway = (gwID: string, v: boolean) => {
    if (!selected) return;

    setGateways((prev) => ({
      ...prev,
      [selected.id]: prev[selected.id].map((g) =>
        g.id === gwID ? { ...g, isActive: v } : g,
      ),
    }));
  };

  return (
    <div className="">
      <div className="px-6 py-10">
        {/* header */}

        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-xl font-semibold">Payment accounts</h1>

            <p className="text-muted-foreground text-sm">
              Configure accounts per legal entity
            </p>
          </div>

          <Button onClick={() => setCreateOpen(true)}>+ New account</Button>
        </div>

        {/* accounts */}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mb-10">
          {accounts.map((acc) => (
            <AccountCard
              key={acc.id}
              account={acc}
              le={leMap[acc.legalEntityID]}
              selected={selected?.id === acc.id}
              onClick={() => setSelected(acc)}
            />
          ))}

          <div
            onClick={() => setCreateOpen(true)}
            className="border-2 border-dashed rounded-xl flex items-center justify-center h-[130px] cursor-pointer hover:border-primary/40"
          >
            + New account
          </div>
        </div>

        {/* gateways */}

        {selected && (
          <div className="bg-background border rounded-xl">
            <div className="flex justify-between px-5 py-4 border-b">
              <div>
                <div className="font-semibold">
                  {leMap[selected.legalEntityID]?.name}
                </div>

                <div className="text-xs font-mono text-muted-foreground">
                  {selected.accountRef}
                </div>
              </div>

              <Button size="sm">+ Add gateway</Button>
            </div>

            <div className="p-4 space-y-3">
              {currentGWs.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-10">
                  No gateways configured yet
                </div>
              )}

              {currentGWs.map((gw) => (
                <GatewayRow
                  key={gw.id}
                  gw={gw}
                  onRemove={() => removeGateway(gw.id)}
                  onToggle={(v) => toggleGateway(gw.id, v)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
