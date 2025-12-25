import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { useDialogModal } from "@/context/DialogModalContext";
import { useRestaurantLayout } from "@/_hospitalityapp/Restaurant/apis/queries/Restaurant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { ArrowRightCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutationCreateTableSession } from "@/_hospitalityapp/Restaurant/apis/mutations/Restaurant";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export default function RestaurantTableManagementSection() {
  const { openModal, closeModal } = useDialogModal();
  const { data } = useRestaurantLayout();
  const router = useRouter();

  const handleTableAction = (table: any) => {
    if (table.status === "OCCUPIED") {
      router.navigate({
        to: "/dashboard/sharp_hospitality/restaurant/$tableId",
        params: { tableId: table.id },
      });
    } else if (table.status === "AVAILABLE") {
      openModal(
        <CreateTableBookingSession
          closeModal={closeModal}
          restId={data?.restaurant_id}
          table={table}
        />,
        "",
        ""
      );
    }
  };

  return (
    <div className=" flex gap-4">
      {data?.floors?.map((flr: any) => (
        <div
          key={flr.id}
          className={cn(
            "rounded-xl border p-4 transition-all duration-300 overflow-hidden"
          )}
        >
          {/* Floor title */}
          <div className="font-bold text-lg mb-2 col-span-4">{flr.name}</div>

          {/* Grid wrapper for tables */}
          <div className=" gap-3">
            <div className="p-2 rounded-lg space-y-3">
              {/* Floor-level table listing */}
              <div className="flex flex-wrap gap-4">
                {flr.tables.map((table: any) => (
                  <ContextMenu key={table.id}>
                    <ContextMenuTrigger>
                      <div
                        onClick={() => handleTableAction(table)}
                        className={cn(
                          "h-10 w-20 border rounded-2xl flex items-center justify-center text-xs shadow-sm transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
                          table.status === "AVAILABLE"
                            ? "bg-green-500 text-gray-900"
                            : "",
                          table.status === "OCCUPIED"
                            ? "bg-yellow-400 text-gray-900"
                            : "",
                          table.status === "RESERVED"
                            ? "bg-red-300 text-gray-900"
                            : "",
                          table.status === "CLEANING"
                            ? "bg-orange-300 text-gray-900"
                            : ""
                        )}
                      >
                        <span className="font-medium">{table.name}</span>
                      </div>
                    </ContextMenuTrigger>

                    {/* ContextMenu */}
                    <ContextMenuContent className="w-52">
                      <ContextMenuItem inset>
                        Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem inset disabled>
                        Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem inset>
                        Close Table Bill{" "}
                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem variant="destructive">
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreateTableBookingSession({ closeModal, restId, table }: any) {
  const createTableSession = useMutationCreateTableSession();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      restuarantId: restId,
      tableId: table?.id,
      guest_mobile_number: "",
      guest_name: "",
    },
    onSubmit: ({ value }) => {
      createTableSession.mutate(value, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["Hospitality", "Restaurant", "Layout"],
          });
          closeModal();
        },
      });
    },
  });

  return (
    <div>
      <div>{table?.name}</div>
      <div className="text-xs font-semibold">{table?.id}</div>

      {/* Single Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(); // Correct
        }}
      >
        <FieldSet>
          <FieldGroup>
            {/* Guest Name */}
            <form.Field name="guest_name">
              {(field) => (
                <Field>
                  <FieldLabel>Guest Name{"(optional)"}</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Guest Name"
                  />
                </Field>
              )}
            </form.Field>

            {/* Guest Mobile Number */}
            <form.Field name="guest_mobile_number">
              {(field) => (
                <Field>
                  <FieldLabel>Guest Mobile Number{"(optional)"}</FieldLabel>
                  <Input
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="ex :-> 9828823314"
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex flex-col gap-4 mt-2">
          <Button type="submit">
            Create Booking Session <ArrowRightCircle />
          </Button>
          <div className="text-muted-foreground text-xs font-semibold">
            You don’t need customer details to create a session, but you need at
            least name OR mobile number to close a session and generate an
            invoice.
          </div>
        </div>
      </form>
    </div>
  );
}
