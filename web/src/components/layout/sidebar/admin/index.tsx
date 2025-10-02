"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { AdminDashboardSidebarFooter } from "./Footer";
import { menuItems } from "./menuItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminDashboardSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="text-white">
      <SidebarHeader className="bg-orange-900">
        Cromachain Presale Admin
      </SidebarHeader>
      <SidebarContent className="bg-orange-900">
        <SidebarGroup className="space-y-2">
          {menuItems.map((item, i) => (
            <SidebarMenuButton key={i} asChild isActive={item.value === pathname}>
              <Link href={item.value}>{item.label}</Link>
            </SidebarMenuButton>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-orange-900">
        <AdminDashboardSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
