import { useMutateCreateAccount } from "@/_accountingapp/api/mutations/accounts";
import { useAccountingGroupOfBook } from "@/_accountingapp/api/queries/accounting_groups";
import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import type { CreateAccountRequest } from "@/_accountingapp/schemas/interfaces/requests";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@radix-ui/react-switch";
import { Button } from "@/components/ui/button";

export function CreateAccountForm() {
  // this will fetch the All the books available in Organization
  const { data: books } = useOrgAccountingBooks();

  const [groupId, setGroupId] = useState<string | undefined>();

  // this will only run when Book id is given as string
  const { data: groups } = useAccountingGroupOfBook(groupId!);

  const createAccount = useMutateCreateAccount();

  const defaultAccount: CreateAccountRequest = {
    accounting_book_id: "",
    account_group_id: "",
    name: "",
    code: "",

    opening_balance: undefined as number | undefined,
    is_debit: true,
    is_default: false,
  };

  const form = useForm({
    defaultValues: defaultAccount,
    onSubmit: async ({ value }) => {
      console.log("Submitted Data:", value);
      createAccount.mutateAsync(value);
    },
  });

  return (
    <div>
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Add Accounts</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>

            <form.Field
              name="accounting_book_id"
              listeners={{
                onChange: ({ value }) => {
                  setGroupId(value);
                },
              }}
              children={(field) => {
                // Call the Group API after Selecting the Book
                return (
                  <Field>
                    <FieldLabel>Select Accounting Book</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => {
                        field.handleChange(val);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Book" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Books</SelectLabel>
                          {books?.data?.account_books.map((bk: any) => (
                            <SelectItem key={bk.id} value={bk.id}>
                              {bk.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />

            <FieldGroup>
              <form.Field
                name="account_group_id"
                listeners={{
                  onChange: ({ value }) => {
                    console.log(
                      `Country changed to: ${value}, resetting province`
                    );
                  },
                }}
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Select Accounting Group</FieldLabel>

                      {groupId && groups ? (
                        <Select
                          value={field.state.value}
                          onValueChange={(val) => {
                            field.handleChange(val);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Group</SelectLabel>
                              {groups?.data?.account_groups.map((ag: any) => (
                                <SelectItem key={ag.id} value={ag.id}>
                                  {ag.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div>Select Book First</div>
                      )}
                    </Field>
                  );
                }}
              />

              <div className="flex gap-3.5">
                <form.Field
                  name="name"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Add Account Book Name </FieldLabel>
                        <Input
                          placeholder="Account Name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="code"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Account Book Code</FieldLabel>
                        <Input
                          placeholder="Account Code"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="flex gap-3.5">
                <form.Field
                  name="opening_balance"
                  children={(field) => {
                    const value =
                      field.state.value === undefined
                        ? ""
                        : String(field.state.value);
                    return (
                      <Field>
                        <FieldLabel>Opening Balance</FieldLabel>
                        <Input
                          type=""
                          placeholder="Ex :--> 20,000"
                          value={value}
                          onChange={(e) => {
                            const raw = e.target.value;

                            // Allow empty
                            if (raw === "") {
                              field.handleChange(undefined);
                              return;
                            }

                            // Allow only valid numeric patterns
                            if (!/^-?\d*\.?\d*$/.test(raw)) {
                              return; // ignore invalid keystroke
                            }

                            field.handleChange(Number(raw));
                          }}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="is_debit"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Balance Type</FieldLabel>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            Credit
                          </span>

                          <Switch
                            checked={field.state.value}
                            onCheckedChange={(checked) =>
                              field.handleChange(checked)
                            }
                          />

                          <span className="text-sm text-muted-foreground">
                            Debit
                          </span>
                        </div>
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="is_default"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Is Default</FieldLabel>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {field.state.value ? "Yes" : "No"}
                        </span>
                      </div>
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <Field orientation="horizontal" className="pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "creating..." : "Create Account"}
                  </Button>
                )}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}