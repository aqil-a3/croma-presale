import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR } from "@/config/variables";
import Image from "next/image";
import Link from "next/link";
import { FC, SVGProps } from "react";
import DiscordIcon from "./icons/discord.svg";
import Telegram from "./icons/telegram.svg";
import XIcon from "./icons/x.svg";

interface ItemType {
  Icon: FC<SVGProps<SVGElement>>;
  label: string;
  href: string;
}

const items: ItemType[] = [
  {
    href: "#",
    Icon: DiscordIcon,
    label: "Join Discord",
  },
  {
    href: "#",
    Icon: Telegram,
    label: "Join Telegram",
  },
  {
    href: "#",
    Icon: XIcon,
    label: "Join X",
  },
];

export function DashboardSidebarFooter() {
  return (
    <div
      style={{ background: GRADIENT_MAIN_COLOR }}
      className="relative mt-4 pt-4 pb-16 rounded-2xl flex flex-col justify-center items-center"
    >
      <p className={`${fontPoppins.className} font-semibold text-white`}>
        Stay Up to Date
      </p>
      <p
        className={`${fontPoppins.className} font-normal text-white text-xs text-center`}
      >
        Join our cromachain community to get more updated news
      </p>
      <div className="absolute bottom-0 translate-y-[80%] bg-white rounded-2xl w-40 py-2 space-y-2">
        <h4
          className={`${fontPoppins.className} font-semibold text-black text-sm text-center`}
        >
          Social Media
        </h4>
        <Image
          src={"/images/logo.png"}
          alt="Logo Cromachain"
          height={44}
          width={36}
          className="object-cover block mx-auto"
        />
        <p
          className={`${fontPoppins.className} font-medium text-black text-sm text-center`}
        >
          Cromachain
        </p>

        <div className="space-y-2">
          {items.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="bg-[#0000001A] rounded-2xl flex gap-2 items-center px-1 py-1 text-center"
            >
              <item.Icon className="w-6 h-6 text-[#000000CC]" />
              <span className={`${fontPoppins.className} text-sm font-medium text-[#000000CC]`}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
