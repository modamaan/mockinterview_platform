import * as React from "react";
import { cn } from "@/lib/utils";

// Card component with hover effect for better user interaction
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-md transition-transform transform hover:scale-105 hover:shadow-lg",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardHeader component with bottom border for separation
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 border-b", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle component with primary color and bold font
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-tight tracking-tight text-primary",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription component with muted text color
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// CardContent component for main content area
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

// CardFooter component with top border for separation and alignment
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end p-6 border-t", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Exporting all components for use in other parts of the application
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };