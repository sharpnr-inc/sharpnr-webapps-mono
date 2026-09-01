import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@sharpnr/utils";
import { usePermissionCatalog } from "../api/queries";
import { PermissionMatrixContext } from "../context";
import {
  isDirty,
  serializeDraft,
  usePermissionMatrixStore,
} from "../store/usePermissionMatrixStore";
import type {
  ConditionPalette,
  PermissionCatalog,
  PermissionRules,
  RolePermissionsPayload,
} from "../types";
import { MatrixFooter } from "./MatrixFooter";
import { MatrixGroups } from "./MatrixGroups";
import { MatrixToolbar } from "./MatrixToolbar";

export interface PermissionMatrixProps {
  /** Shown in the summary line. */
  roleName?: string;
  /**
   * Permissions the role already has. Pass the server's response; the store
   * keeps it as the baseline so Reset and the dirty check work.
   */
  initialActions?: string[];
  /**
   * Per-resource narrowing (instances and restrictions), as stored. A resource
   * type absent from this map is granted broadly — see PermissionRules.
   */
  initialRules?: PermissionRules;
  /**
   * Keys restrictions can be authored against. Omit to offer none, which hides
   * the restriction controls entirely — a reasonable first release.
   */
  palette?: ConditionPalette;
  /**
   * Catalog override. Omit to fetch it (usePermissionCatalog). Passing it
   * explicitly is what lets this screen be demoed, storybooked or tested with
   * no backend at all.
   */
  catalog?: PermissionCatalog;
  /** Receives the entire save payload: granted actions plus instance scoping. */
  onSave?: (payload: RolePermissionsPayload) => void | Promise<void>;
  saving?: boolean;
  /** Compose the parts yourself; omit for the default layout. */
  children?: ReactNode;
  className?: string;
}

export function PermissionMatrixRoot({
  roleName,
  initialActions,
  initialRules,
  palette = { keys: [] },
  catalog: catalogProp,
  onSave,
  saving = false,
  children,
  className,
}: PermissionMatrixProps) {
  const [query, setQuery] = useState("");

  const fetched = usePermissionCatalog();
  // Skip the request entirely when a catalog was handed in.
  const allResources = catalogProp ?? fetched.data ?? [];
  const loading = catalogProp ? false : fetched.isLoading;

  const granted = usePermissionMatrixStore((s) => s.granted);
  const rules = usePermissionMatrixStore((s) => s.rules);
  const baseline = usePermissionMatrixStore((s) => s.baseline);
  const load = usePermissionMatrixStore((s) => s.load);

  // Reload the draft whenever the server's answer changes — switching roles,
  // or a save settling. Keyed on the joined ids so an identical array from a
  // refetch does not stomp on edits in progress.
  const initialKey = serializeDraft(
    new Set(initialActions ?? []),
    initialRules ?? {},
  );
  useEffect(() => {
    load(initialActions ?? [], initialRules ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKey, load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allResources;
    return allResources
      .map((r) => {
        // A resource matches whole when its own name matches; otherwise it is
        // narrowed to the actions that match, so searching "delete" shows the
        // delete boxes rather than every box on a matching resource.
        if (r.label.toLowerCase().includes(q)) return r;
        const actions = r.actions.filter(
          (a) =>
            a.label.toLowerCase().includes(q) ||
            a.description?.toLowerCase().includes(q),
        );
        return actions.length > 0 ? { ...r, actions } : null;
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [allResources, query]);

  const totalCount = useMemo(
    () => allResources.reduce((n, r) => n + r.actions.length, 0),
    [allResources],
  );

  const value = {
    catalog: visible,
    allResources,
    palette,
    loading,
    dirty: isDirty(granted, rules, baseline),
    grantedCount: granted.size,
    totalCount,
    query,
    setQuery,
    saving,
    onSave: onSave
      ? () => void onSave({ actions: [...granted], rules })
      : undefined,
  };

  return (
    <PermissionMatrixContext.Provider value={value}>
      <div className={cn("mx-auto max-w-3xl space-y-5", className)}>
        {children ?? (
          <>
            <MatrixToolbar roleName={roleName} />
            <MatrixGroups />
            <MatrixFooter />
          </>
        )}
      </div>
    </PermissionMatrixContext.Provider>
  );
}
