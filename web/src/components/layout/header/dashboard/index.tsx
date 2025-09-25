"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopDashboardHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

export function DashboardHeader() {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileHeader />;
  return <DesktopDashboardHeader />;
}
