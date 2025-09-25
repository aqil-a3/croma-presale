import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont, PANEL_BG_TW } from "@/config/variables";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDisconnect } from "wagmi";
import { cn } from "@/lib/utils";
import { navigationItems } from "../../sidebar/dashboard/NavigationItem";

export function DropdownMenuMobile() {
  const { disconnect } = useDisconnect({
    mutation: {
      onError: (err) => {
        console.error(err);
        toast.error("Something wrong");
      },
      onSuccess: () =>
        toast.success("Wallet Disconnected! Thanks for Using Cromachain"),
    },
  });
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          className="bg-white/10 border border-gray-600 rounded-xl"
        >
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${PANEL_BG_TW} backdrop-blur-xl border border-gray-600 ${fontOrbitron.className} text-white`}
      >
        <DropdownMenuLabel className={fontPoppins.className}>
          Dashboard Menu
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navigationItems.map((nav, i) => {
          const isActive = nav.href === pathname;
          return (
            <DropdownMenuItem
              onClick={() => router.push(nav.href)}
              key={i}
              className={cn(`text-white`, isActive && mainGradientFont)}
            >
              {nav.label}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          onClick={() => {
            disconnect();
            router.replace("/home");
          }}
          className="text-red-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
