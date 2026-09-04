import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:text-slate-600 hover:bg-slate-200",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-700 border-b-4 active:border-b-2",
        primaryOutline: "bg-white text-blue-600 hover:bg-blue-100",
        secondary: "bg-green-600 text-white hover:bg-green-700 border-green-700 border-b-4 active:border-b-2",
        secondaryOutline: "bg-white text-green-600 hover:bg-green-100",
        danger: "bg-red-600 text-white hover:bg-red-700 border-red-700 border-b-4 active:border-b-2",
        dangerOutline: "bg-white text-red-600 hover:bg-red-100",
        super: "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-700 border-b-4 active:border-b-2",
        superOutline: "bg-white text-indigo-600 hover:bg-indigo-100",
        ghost: "bg-transparent text-gray-600 border-transparent border-0 hover:bg-gray-100",
        sidebar: "bg-transparent text-gray-600 border-2 border-transparent hover:bg-gray-100 transition-none",
        sidebarOutline: "bg-blue-100 text-blue-600 border-blue-300 border-2 hover:bg-blue-200 transition-none",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the type for button variants
type ButtonVariant = VariantProps<typeof buttonVariants>;

// Define the ButtonProps interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariant {
  asChild?: boolean;
}

// Create the Button component
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