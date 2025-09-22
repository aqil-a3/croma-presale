"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { cn } from "@/lib/utils";
import { Bell, Copy, Menu, User, Wallet } from "lucide-react";

export function DashboardHeader() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <header
      style={{ background: PANEL_BG }}
      className={cn(
        "absolute w-[calc(100vw-4rem)] flex justify-between items-center px-8 z-10 backdrop-blur-3xl min-h-16", open && "w-[calc(100vw-14rem)]"
      )}
    >
      <Button
        size={"icon"}
        onClick={toggleSidebar}
        className="bg-white/10 border border-gray-600 rounded-xl"
      >
        <Menu />
      </Button>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center text-[#FFFFFF80] font-semibold text-sm">
          <Wallet />
          <span className={`${fontPoppins.className}`}>Wallet Connected</span>
        </div>
        <Button className="bg-white/10 border border-gray-600 rounded-xl">
          <span
            className={`${fontPoppins.className} font-semibold text-[#FFFFFF80] text-sm`}
          >
            0x1234...5678
          </span>
          <Copy />
        </Button>
        <Button
          size={"icon"}
          className="bg-white/10 border border-gray-600 rounded-xl"
        >
          <Bell />
        </Button>
        <Button
          size={"icon"}
          className="bg-white/10 border border-gray-600 rounded-xl"
        >
          <User />
        </Button>
      </div>
    </header>
  );
}
