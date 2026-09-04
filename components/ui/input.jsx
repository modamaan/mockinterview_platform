```jsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ease-in-out",
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

In this updated version, the input field has been redesigned to improve aesthetics and usability. The height and padding have been increased for better touch targets, the border and focus styles have been updated for a more modern look, and the typography has been adjusted for better readability. The transition effect has been added for smooth interactions.