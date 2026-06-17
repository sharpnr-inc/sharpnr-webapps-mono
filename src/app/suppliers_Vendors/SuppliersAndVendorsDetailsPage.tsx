import { Route } from "@/routes/_appuser/suppliers&Vendors/$suppliersID/details";
import { useLegalEntityLinkToSuppliersMutation } from "./api/mutations";

export function SuppliersAndVendorsDetailsPage() {
  const { suppliersID } = Route.useParams();

  const { mutate, isPending, isSuccess, isError, error, data } =
    useLegalEntityLinkToSuppliersMutation();

  const handleTestLink = () => {
    mutate({
      suppliers_id: suppliersID,
      legal_entity_id: "fe64042a-27d4-4602-bbf8-65a4c6bf6f83",
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
          ❌ Error linking Legal Entity: {(error as Error)?.message}
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
