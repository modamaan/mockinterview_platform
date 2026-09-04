```jsx
"use client";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header";
import logo from "../../public/logo.svg";
import { createContext, useState } from "react";
export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <Header logo={logo} />
      <div className="container mx-auto px-4 py-6">
        <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
          {children}
        </WebCamContext.Provider>
      </div>
    </div>
  );
};

export default DashboardLayout;
```
