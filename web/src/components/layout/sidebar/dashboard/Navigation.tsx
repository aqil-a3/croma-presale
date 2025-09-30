import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  Icon: FC<SVGProps<SVGElement>> | LucideIcon;
  label: string;
  href: string;
  open: boolean;
};

export function SidebarItem({ Icon, label, href, open }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="block"
    >
      <div
        className={cn(
          "group flex items-center gap-3 h-12 rounded-full px-2 transition-all duration-300",
          "bg-gradient-to-r",
          isActive
            ? "from-[#B72204] to-[#FC6400]"
            : "from-transparent to-transparent hover:from-[#B72204] hover:to-[#FC6400]",
          open ? "justify-start" : "justify-center"
        )}
      >
        <Icon
          className={cn(
            "transition-all w-6 h-6 text-[#888] group-hover:text-white",
            isActive && `w-5 h-5 text-white`
          )}
        />

        {/* LABEL */}
        {open && (
          <span
            className={cn(
              fontPoppins.className,
              "text-base font-semibold whitespace-nowrap transition-colors",
              isActive ? "text-white" : "text-[#888888] group-hover:text-white"
            )}
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  );
}
