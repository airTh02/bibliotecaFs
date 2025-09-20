"use client"

import { DashboardProvider } from "@/context/dashboardContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  );
}