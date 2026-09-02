import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
