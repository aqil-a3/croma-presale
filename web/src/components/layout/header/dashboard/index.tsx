"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { cn } from "@/lib/utils";
import { shortenAddress } from "@/utils/shortenAddress";
import { Bell, Copy, Menu, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export function DashboardHeader() {
  const { toggleSidebar, open } = useSidebar();
  const { address } = useAccount();
  const router = useRouter();

  return (
    <header
      style={{ background: PANEL_BG }}
      className={cn(
        "absolute w-[calc(100vw-3.5rem)] flex justify-between items-center px-8 z-20 backdrop-blur-3xl min-h-16",
        open && "w-[calc(100vw-13.5rem)]"
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
            {shortenAddress(address!)}
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
          onClick={() => router.push("/profile")}
        >
          <User />
        </Button>
      </div>
    </header>
  );
}
