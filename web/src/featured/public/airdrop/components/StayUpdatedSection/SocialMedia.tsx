import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface ItemType {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const items: ItemType[] = [
  {
    href: "#",
    icon: (
      <Image
        src={"/logo/discord.svg"}
        width={30}
        height={30}
        alt="Logo Discord"
      />
    ),
    label: "Join Discord",
  },
  {
    href: "#",
    icon: (
      <Image
        src={"/logo/telegram.svg"}
        width={30}
        height={30}
        alt="Logo Telegram"
      />
    ),
    label: "Join Telegram",
  },
  {
    href: "#",
    icon: <Image src={"/logo/X.svg"} width={30} height={30} alt="Logo X" />,
    label: "Join X",
  },
];

export function SocialMedia() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <a href={item.href} key={i} target="_blank">
          <Button className="bg-white/10 border border-gray-700 w-full py-6 rounded-full">
            {item.icon}
            {item.label}
          </Button>
        </a>
      ))}
    </div>
  );
}
