import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PANEL_BG } from "@/config/variables";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { HeaderLogo } from "./Logo";
import { navigationItems } from "./Navigation";
import Link from "next/link";
import { MobileCTAButton } from "./MobileCTAButton";

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent
        style={{ background: PANEL_BG }}
        side="left"
        className="backdrop-blur-3xl p-4"
      >
        <SheetHeader>
          <SheetTitle>
            <HeaderLogo />
          </SheetTitle>
        </SheetHeader>
        {navigationItems.map((item, index) => {
          const isActive = item.href === pathname;
          return (
            <Link href={item.href} key={index}>
              <button
                className={`relative w-fit mt-[-1.00px] [font-family:'Orbitron',Helvetica] ${
                  isActive
                    ? "font-bold text-[#d73602]"
                    : "font-normal text-[#e9e9e9]"
                } text-lg text-center tracking-[0] leading-[normal] cursor-pointer hover:text-[#d73602] transition-colors`}
              >
                {item.label}
              </button>
            </Link>
          );
        })}

        <MobileCTAButton />
      </SheetContent>
    </Sheet>
  );
}
