import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "right" | "left" | "bottom";
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col border-border bg-card shadow-xl outline-none",
          side === "right" &&
            "inset-y-0 right-0 h-full w-[min(100%,420px)] border-l",
          side === "left" && "inset-y-0 left-0 h-full w-[min(100%,420px)] border-r",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--radius-xl)] border-t",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-muted">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}
