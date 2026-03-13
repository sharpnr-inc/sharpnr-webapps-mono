import { useTaxCodeStore } from "./store/tax_code.store";

export function CodesDetails() {
  const selected = useTaxCodeStore((s) => s.selectedTaxCategory);

  if (!selected) {
    return (
      <div className="flex items-center justify-center h-[90vh] text-sm opacity-60">
        Select a Tax Code
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">{selected.category_name}</h2>

      <div className="text-sm opacity-70">Code: {selected.code}</div>

      <div className="space-y-2">
        {selected.rules.map((rule, i) => (
          <div key={i} className="border p-3 rounded-md">
            <div className="text-sm font-medium">
              {rule.tax_type} - {rule.rate}%
            </div>

            <div className="text-xs opacity-70">
              Range: {rule.min_value} → {rule.max_value}
            </div>

            <div className="mt-2 space-y-1">
              {rule.components.map((c, j) => (
                <div key={j} className="text-xs">
                  {c.component_code} — {c.rate}%
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
