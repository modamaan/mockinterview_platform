import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
```

In this updated version, the input field styles have been adjusted to align with the new design specifications. The changes include:
- Increased height (`h-12`) for better touch targets.
- Rounded corners (`rounded-lg`) for a modern look.
- Updated border color (`border-gray-300`) for a subtle appearance.
- Background color set to white (`bg-white`) for contrast.
- Increased padding (`px-4 py-3`) for better spacing.
- Font size increased to `text-base` for readability.
- Placeholder text color adjusted to `text-gray-500`.
- Focus ring color changed to `ring-blue-500` for better visibility.