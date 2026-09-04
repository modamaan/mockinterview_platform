```jsx
import * as React from "react";

import { cn } from "@/lib/utils";

// Card component with updated styles for new design theme
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-gray-300 bg-white text-gray-900 shadow-md", // Updated border, background, and shadow
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardHeader component with updated spacing
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-4 p-5", className)} // Updated spacing
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle component with updated typography
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-snug tracking-normal", className)} // Updated typography
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription component with updated text style
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)} // Updated text style
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// CardContent component with updated padding
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} /> // Updated padding
));
CardContent.displayName = "CardContent";

// CardFooter component with updated spacing
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0", className)} // Updated spacing
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```