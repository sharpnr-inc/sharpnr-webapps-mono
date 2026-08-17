import { cn } from "@sharpnr/ui";

type WordmarkProps = {
  className?: string;
};

/** SharpIAM lockup — monochrome, inherits the current text color. */
const Wordmark = ({ className }: WordmarkProps) => {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="inline-flex size-8 items-center justify-center rounded-md border border-foreground/15 bg-foreground text-background">
        <span className="text-sm font-semibold leading-none">S</span>
      </span>
      <span className="text-base font-semibold tracking-tight text-foreground font-heading">
        Sharp<span className="text-muted-foreground">IAM</span>
      </span>
    </span>
  );
};

export default Wordmark;
