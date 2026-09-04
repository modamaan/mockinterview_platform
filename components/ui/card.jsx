import * as React from "react";
import { cn } from "@/lib/utils";

// Card component with improved design and hover effect
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardHeader component with updated styling
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 border-b bg-header", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle component with improved typography
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

// CardDescription component with muted text style
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// CardContent component with padding
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

// CardFooter component with updated styling
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end p-6 border-t bg-footer", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Exporting all components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };