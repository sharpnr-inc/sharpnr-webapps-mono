import {
  useUtilsLegalEntityEntityTypes,
  useUtilsLegalEntityGSTRegistrationTypes,
  useUtilsLegalEntityAddressTypes,
  useUtilsLegalEntityLicenseTypes,
  useUtilsLegalEntityContactTypes,
  useUtilsLegalEntityIdentifierTypes,
} from "../api/queries";

export function LegalEntityIndexPage() {
  // Execute all endpoints concurrently to verify network routing and DI parsing
  const { data: entityTypes, isLoading: loadingEntities } =
    useUtilsLegalEntityEntityTypes();
  const { data: gstTypes, isLoading: loadingGST } =
    useUtilsLegalEntityGSTRegistrationTypes();
  const { data: addressTypes, isLoading: loadingAddresses } =
    useUtilsLegalEntityAddressTypes();
  const { data: licenseTypes, isLoading: loadingLicenses } =
    useUtilsLegalEntityLicenseTypes();
  const { data: contactTypes, isLoading: loadingContacts } =
    useUtilsLegalEntityContactTypes();
  const { data: identifierTypes, isLoading: loadingIdentifiers } =
    useUtilsLegalEntityIdentifierTypes();

  const isAnyLoading =
    loadingEntities ||
    loadingGST ||
    loadingAddresses ||
    loadingLicenses ||
    loadingContacts ||
    loadingIdentifiers;

  return (
    <div className="space-y-6 mt-4 p-2">
      <div className="border-b pb-2">
        <h1 className="text-xl font-bold tracking-tight">
          Legal Entity Infrastructure Diagnostic
        </h1>
        <p className="text-sm">
          Mount checking utility endpoints for data integrity verification.
        </p>
      </div>

      {isAnyLoading ? (
        <div className="text-sm animate-pulse">
          Resolving orchestration telemetry...
        </div>
      ) : (
        <div className="space-y-4 font-mono text-xs">
          <div className="border p-2">
            <strong>Entity Types ({entityTypes?.length ?? 0}):</strong>
            <pre className="mt-1 max-h-24 overflow-auto bg-neutral-5xl p-1 text-neutral-400">
              {JSON.stringify(entityTypes, null, 2)}
            </pre>
          </div>

          <div className="border p-2">
            <strong>GST Schemes ({gstTypes?.length ?? 0}):</strong>
            <pre className="mt-1 max-h-24 overflow-auto bg-neutral-5xl p-1 text-neutral-400">
              {JSON.stringify(gstTypes, null, 2)}
            </pre>
          </div>

          <div className="border p-2">
            <strong>Address Designations ({addressTypes?.length ?? 0}):</strong>
            <pre className="mt-1 max-h-24 overflow-auto bg-neutral-5xl p-1 text-neutral-400">
              {JSON.stringify(addressTypes, null, 2)}
            </pre>
          </div>

          <div className="border p-2">
            <strong>Compliance Licenses ({licenseTypes?.length ?? 0}):</strong>
            <pre className="mt-1 max-h-24 overflow-auto bg-neutral-5xl p-1 text-neutral-400">
              {JSON.stringify(licenseTypes, null, 2)}
            </pre>
          </div>

          <div className="border p-2">
            <strong>Contact Roles ({contactTypes?.length ?? 0}):</strong>
            <pre className="mt-1 max-h-24 overflow-auto bg-neutral-5xl p-1 text-neutral-400">
              {JSON.stringify(contactTypes, null, 2)}
            </pre>
          </div>

          <div className="border p-2">
            <strong>
              Registry Identifiers ({identifierTypes?.length ?? 0}):
            </strong>
            <pre className="mt-1 max-h-24 overflow-auto bg-neutral-5xl p-1 text-neutral-400">
              {JSON.stringify(identifierTypes, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
