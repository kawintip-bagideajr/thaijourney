import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border-2 px-3 py-0.5 text-xs font-extrabold shadow-[0_2px_0_var(--badge-edge,var(--game-edge))] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-orange-200 bg-orange-50 text-orange-700 [--badge-edge:#fed7aa]",
        secondary: "border-[var(--game-edge)] bg-white text-gray-700",
        destructive: "border-red-200 bg-red-50 text-red-700 [--badge-edge:#fecaca]",
        outline: "border-[var(--game-edge)] bg-transparent text-foreground",
        success: "border-green-300 bg-green-100 text-green-700 [--badge-edge:#86efac]",
        gold: "border-amber-200 bg-amber-50 text-amber-700 [--badge-edge:#fde68a]",
        purple: "border-purple-200 bg-purple-50 text-purple-700 [--badge-edge:#e9d5ff]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
