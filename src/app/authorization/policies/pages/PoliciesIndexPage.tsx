import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div className="inline-flex rounded-md border p-0.5 text-xs">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded px-2.5 py-1 font-medium transition-colors",
            value === o.value
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const PoliciesIndexPage = () => {
  const navigate = useNavigate();
  // Kick off the real query so it's cached for when the backend is wired up.

  return <div className="mx-auto w-full max-w-6xl space-y-6 p-6"></div>;
};

export default PoliciesIndexPage;
