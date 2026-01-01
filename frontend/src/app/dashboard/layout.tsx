"use client"

import { AuthProvider } from "@/context/authContext";
import { DashboardProvider } from "@/context/dashboardContext";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <DashboardProvider>
        {children}
      </DashboardProvider>
  );
}