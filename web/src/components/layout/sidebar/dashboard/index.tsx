"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { LogoSidebar } from "./Logo";
import { DashboardNavigationItem } from "./NavigationItem";
import { DashboardSidebarFooter } from "./SidebarFooter";

interface Props {
  isAdmin: boolean;
}

export function DashboardSidebar({ isAdmin }: Props) {
  const { open } = useSidebar();

  return (
    <aside
      className={cn(
        "min-h-screen bg-gradient-to-bl py-8 from-neutral-900 to-orange-900 text-white transition-all duration-300 hidden lg:flex flex-col",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col gap-2 p-2">
        <LogoSidebar open={open} />
        <DashboardNavigationItem open={open} isAdmin={isAdmin} />
        {open && <DashboardSidebarFooter />}
      </div>
    </aside>
  );
}
