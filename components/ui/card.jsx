import * as React from "react";

import { cn } from "@/lib/utils";

// Card component with updated styles for a more modern look
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-200 bg-white text-gray-900 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardHeader with updated padding and background color for better contrast
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 p-5 bg-gray-50", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle with updated font size and weight for improved readability
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-gray-800",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription with a lighter text color for a more subtle appearance
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// CardContent with adjusted padding for better content spacing
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// CardFooter with a border-top and padding adjustments for consistency
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0 border-t border-gray-100", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};