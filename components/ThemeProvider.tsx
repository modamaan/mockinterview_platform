```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

// Define the new theme variables
const theme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#f5f5f5",
    text: "#333333",
    accent: "#e74c3c",
  },
  fonts: {
    body: "'Helvetica Neue', Arial, sans-serif",
    heading: "'Georgia', serif",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  borderRadius: "4px",
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      value={{
        light: theme,
        dark: {
          ...theme,
          colors: {
            ...theme.colors,
            background: "#333333",
            text: "#f5f5f5",
          },
        },
      }}
    >
      {children}
    </NextThemesProvider>
  )
}
```