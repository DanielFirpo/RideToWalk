import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/app/_components/shadcn/utils/shadUtils";

const buttonVariants = cva(
  "inline-flex text-wrap shadow-lg shadow-black-300 items-center justify-center text-sm uppercase ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950",
  {
    variants: {
      variant: {
        default: "bg-white text-metalicCopper hover:bg-white/90",
        secondary: "bg-terracottaOrange text-white hover:bg-terracottaOrange/90 font-bold font-grotesk text-xs sm:text-sm",
        light: "bg-white text-rustyBrown hover:bg-white/90 font-bold",
      },
      size: {
        default: "h-10 py-8 px-5 sm:px-10",
        large: "h-10 min-w-40 px-10 py-5",
        small: "h-10 min-w-36 py-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
