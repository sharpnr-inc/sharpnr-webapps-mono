import { cn } from "@/lib/utils";

export function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const cls = {
    xs: "h-5 w-5 text-[9px]",
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  }[size];
  return (
    <div
      className={cn(
        "rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0",
        cls,
      )}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
