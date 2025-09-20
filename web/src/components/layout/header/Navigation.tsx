"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/home" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Airdrop", href: "/airdrop" },
  { label: "Referral", href: "/referral" },
];

export function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav className="inline-flex items-center gap-[34px] relative flex-[0_0_auto]">
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
    </nav>
  );
}
