import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-extrabold tracking-wide ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
  {
    variants: {
      variant: {
        default: "btn-3d bg-orange-500 text-white [--btn-edge:#c2410c]",
        destructive: "btn-3d bg-red-500 text-white [--btn-edge:#b91c1c]",
        outline: "btn-3d border-2 border-[var(--game-edge)] bg-white text-orange-600 hover:bg-orange-50 [--btn-edge:var(--game-edge)]",
        secondary: "btn-3d border-2 border-[var(--game-edge)] bg-white text-gray-800 [--btn-edge:var(--game-edge)]",
        ghost: "hover:bg-gray-100 text-gray-700",
        link: "text-orange-500 underline-offset-4 hover:underline",
        success: "btn-3d bg-green-500 text-white [--btn-edge:#15803d]",
        gold: "btn-3d gradient-thai text-white [--btn-edge:#b45309]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
