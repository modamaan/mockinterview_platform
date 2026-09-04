```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define button variants with updated styles for the new design theme
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-slate-300 border-2 border-b-4 active:border-b-2 hover:text-slate-600 hover:bg-slate-200",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-800",
        link: "text-blue-600 underline-offset-4 hover:underline",
        primary: "bg-blue-500 text-white hover:bg-blue-600 border-blue-600 border-b-4 active:border-b-2",
        primaryOutline: "bg-white text-blue-500 hover:bg-blue-100",
        secondary: "bg-green-500 text-white hover:bg-green-600 border-green-600 border-b-4 active:border-b-2",
        secondaryOutline: "bg-white text-green-500 hover:bg-green-100",
        danger: "bg-red-500 text-white hover:bg-red-600 border-red-600 border-b-4 active:border-b-2",
        dangerOutline: "bg-white text-red-500 hover:bg-red-100",
        super: "bg-purple-500 text-white hover:bg-purple-600 border-purple-600 border-b-4 active:border-b-2",
        superOutline: "bg-white text-purple-500 hover:bg-purple-100",
        ghost: "bg-transparent text-gray-600 border-transparent border-0 hover:bg-gray-100",
        sidebar: "bg-transparent text-gray-600 border-2 border-transparent hover:bg-gray-100 transition-none",
        sidebarOutline: "bg-blue-100 text-blue-500 border-blue-300 border-2 hover:bg-blue-200 transition-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariant = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariant {
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
```