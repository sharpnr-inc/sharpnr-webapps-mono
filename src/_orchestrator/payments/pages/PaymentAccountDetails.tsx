import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/payments/$accountId/index";
import { AddGatewayConfigForm } from "../components/AddGatewayConfigForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Copy, Check } from "lucide-react";
import { usePaymentAccountConfig } from "../api/api.queries";

// ─── Webhook URL per provider ─────────────────────────────────────────────────
// These are YOUR server endpoints — tenant pastes these into their gateway dashboard

const WEBHOOK_URLS: Record<string, string> = {
  PHONEPE: `${import.meta.env.VITE_API_URL}/webhooks/phonepe/callback`,
  RAZORPAY: `${import.meta.env.VITE_API_URL}/webhooks/razorpay/callback`,
};

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-muted transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

// ─── Webhook URL row ──────────────────────────────────────────────────────────

function WebhookURLRow({ providerCode }: { providerCode: string }) {
  const webhookURL = WEBHOOK_URLS[providerCode];

  if (!webhookURL) return null;

  return (
    <div className="mt-3 rounded-lg border border-dashed bg-muted/40 px-3 py-2">
      <p className="text-xs text-muted-foreground mb-1 font-medium">
        Webhook URL — paste this in your {providerCode} dashboard
      </p>
      <div className="flex items-center justify-between gap-2">
        <code className="text-xs font-mono text-foreground break-all">
          {webhookURL}
        </code>
        <CopyButton value={webhookURL} />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function PaymentAccountDetails() {
  const { accountId } = Route.useParams();
  const [configForm, setConfigForm] = useState(false);
  const { data, isLoading } = usePaymentAccountConfig(accountId);
  const configs = data?.data ?? [];

  return (
    <div className="space-y-6 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Gateway configurations</h2>
          <p className="text-sm text-muted-foreground">
            Manage payment gateway credentials for this account
          </p>
        </div>
        <Button onClick={() => setConfigForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add gateway
        </Button>
      </div>

      {/* Loading */}
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

      {/* Empty state */}
      {!isLoading && configs.length === 0 && (
        <div className="rounded-xl border p-8 text-center space-y-2">
          <p className="text-sm font-medium">No gateway configured yet</p>
          <p className="text-xs text-muted-foreground">
            Add your first payment gateway to start processing transactions
          </p>
          <Button
            size="sm"
            className="mt-3"
            onClick={() => setConfigForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add gateway
          </Button>
        </div>
      )}

      {/* Config list */}
      {configs.length > 0 && (
        <div className="grid gap-4">
          {configs.map((config: any) => (
            <div key={config.id} className="rounded-xl border p-4">
              {/* Top row — name + badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{config.display_name}</span>

                  {config.is_test_mode && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      Test mode
                    </span>
                  )}

                  {config.is_active && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
              </div>

              {/* Meta */}
              <p className="text-xs text-muted-foreground mt-1">
                Provider: {config.provider_code}
              </p>
              <p className="text-xs text-muted-foreground">
                Created: {new Date(config.created_at).toLocaleString()}
              </p>

              {/* Webhook URL — only shown for gateways that need it */}
              <WebhookURLRow providerCode={config.provider_code} />
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <AddGatewayConfigForm
        paymentAccountID={accountId}
        configForm={configForm}
        setConfigForm={setConfigForm}
      />
    </div>
  );
}
