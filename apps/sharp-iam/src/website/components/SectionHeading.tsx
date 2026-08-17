import { cn } from "@sharpnr/ui";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center mx-auto max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl font-heading">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
