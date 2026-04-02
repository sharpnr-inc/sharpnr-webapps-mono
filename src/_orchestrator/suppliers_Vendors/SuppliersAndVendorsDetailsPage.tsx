import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/suppliers&Vendors/$suppliersID/details";
import { useLegalEntityLinkToSuppliersMutation } from "./api/mutations";

export function SuppliersAndVendorsDetailsPage() {
  const { suppliersID } = Route.useParams();

  const { mutate, isPending, isSuccess, isError, error, data } =
    useLegalEntityLinkToSuppliersMutation();

  const handleTestLink = () => {
    mutate({
      suppliers_id: suppliersID,
      legal_entity_id: "76039a04-72e2-4693-b103-9b6fe4f3db8a",
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>Suppliers ID: {suppliersID}</div>

      <button
        onClick={handleTestLink}
        className="px-4 py-2 rounded bg-black text-white cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Linking..." : "Test Link Legal Entity"}
      </button>

      {isSuccess && (
        <div className="text-green-600">
          ✅ Legal Entity linked successfully
        </div>
      )}

      {isError && (
        <div className="text-red-600">
          ❌ Error linking Legal Entity: {(error as any)?.message}
        </div>
      )}

      {data && (
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
