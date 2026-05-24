import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@sharpnr/ui";

import { Button } from "@sharpnr/ui";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppForm } from "@/components/forms";
import { useAddGatewayConfigMutation } from "../api/api.mutation";

/*
|--------------------------------------------------------------------------
| Provider Types
|--------------------------------------------------------------------------
*/

type ProviderField = {
  key: string;
  label: string;
  secret?: boolean;
};

type ProviderMeta = {
  label: string;
  fields: ProviderField[];
};

const PROVIDER_META: Record<string, ProviderMeta> = {
  PHONEPE: {
    label: "PhonePe",
    fields: [
      { key: "client_id", label: "Client ID" },
      { key: "client_version", label: "Client Version", secret: true },
      { key: "client_secret", label: "Client Secret" },
    ],
  },

  RAZORPAY: {
    label: "Razorpay",
    fields: [
      { key: "key_id", label: "Key ID" },
      { key: "key_secret", label: "Key Secret", secret: true },
    ],
  },
};

/*
|--------------------------------------------------------------------------
| DTO
|--------------------------------------------------------------------------
*/

export interface GatewayConfigFormRequest {
  payment_account_id: string;
  provider_code: string;
  display_name: string;
  is_test_mode: boolean;
  config: Record<string, string>;
}

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

interface GatewayConfigFormProps {
  paymentAccountID: string;
  configForm: boolean;
  setConfigForm: Dispatch<SetStateAction<boolean>>;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export const AddGatewayConfigForm = ({
  paymentAccountID,
  configForm,
  setConfigForm,
}: GatewayConfigFormProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const { mutateAsync } = useAddGatewayConfigMutation();

  const form = useAppForm({
    defaultValues: {
      payment_account_id: paymentAccountID,
      provider_code: "",
      display_name: "",
      is_test_mode: false,
      config: {},
    } satisfies GatewayConfigFormRequest,

    onSubmit: ({ value }) => {
      mutateAsync(
        {
          payload: value,
        },
        {
          onSuccess: () => {
            setConfigForm(false);
          },
        },
      );
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Provider Change Handler
  |--------------------------------------------------------------------------
  */

  const handleProviderChange = (providerCode: string) => {
    const meta = PROVIDER_META[providerCode];
    if (!meta) return;

    const configDefaults = Object.fromEntries(
      meta.fields.map((f) => [f.key, ""]),
    );

    setSelectedProvider(providerCode);

    form.setFieldValue("provider_code", providerCode);
    form.setFieldValue("display_name", meta.label);
    form.setFieldValue("config", configDefaults);
  };

  const currentFields = PROVIDER_META[selectedProvider]?.fields ?? [];

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <Dialog open={configForm} onOpenChange={setConfigForm}>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add gateway configuration</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Provider Select */}

            <form.AppField
              name="provider_code"
              children={(f) => (
                <Select
                  value={f.state.value}
                  onValueChange={handleProviderChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gateway provider" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(PROVIDER_META).map(([code, meta]) => (
                      <SelectItem key={code} value={code}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {/* Display Name */}

            <form.AppField
              name="display_name"
              children={(f) => <f.TextField label="Display name" />}
            />

            {/* Test Mode */}

            <form.AppField
              name="is_test_mode"
              children={(f) => (
                <f.CheckboxField
                  label="Test mode"
                  checkedLabel="No real transactions will be processed"
                  description="Enable sandbox environment"
                />
              )}
            />

            {/* Provider Config Fields */}

            {selectedProvider === "" ? (
              <p className="text-sm text-muted-foreground">
                Select a provider to see required credentials
              </p>
            ) : (
              currentFields.map((field) => (
                <form.AppField
                  key={field.key}
                  name={`config.${field.key}`}
                  children={(f) => (
                    <f.TextField
                      label={field.label}
                      type={field.secret ? "password" : "text"}
                    />
                  )}
                />
              ))
            )}

            {/* Account ID Display */}

            <p className="text-xs text-muted-foreground">
              Account: {paymentAccountID}
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfigForm(false)}
            >
              Cancel
            </Button>

            <form.AppForm>
              <form.SubmitButton>Save gateway</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
