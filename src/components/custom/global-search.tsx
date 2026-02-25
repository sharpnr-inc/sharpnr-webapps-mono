import { useEffect, useMemo, type SetStateAction, type Dispatch } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FileText } from "lucide-react";

// 1. Define the interface for the props
interface GlobalSearchProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function GlobalSearch({ open, setOpen }: GlobalSearchProps) {
  const navigate = useNavigate();
  const router = useRouter();

  // Shortcut listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // This is the part that fixes your error
  const searchableRoutes = useMemo(() => {
    // We access the underlying routeTree.
    // router.flatRoutes is often the most direct way to get all registered paths.
    const allRoutes = (router as any).flatRoutes || [];

    return allRoutes
      .filter((r: any) => r.staticData?.breadcrumb)
      .map((r: any) => ({
        id: r.id,
        title: r.staticData.breadcrumb as string,
        path: r.fullPath,
      }));
  }, [router]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search everything..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {searchableRoutes.map((route: any) => (
            <CommandItem
              key={route.id}
              value={route.title}
              onSelect={() => {
                setOpen(false);
                navigate({ to: route.path });
              }}
            >
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{route.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
