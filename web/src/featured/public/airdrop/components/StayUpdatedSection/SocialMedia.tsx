import { Button } from "@/components/ui/button";
import { cardVariants, containerVariants } from "@/lib/variants";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

interface ItemType {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const items: ItemType[] = [
  {
    href: "https://discord.com/invite/SWj8TWfu9k",
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
    href: "https://t.me/Cromaartofficial",
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
    href: "https://x.com/CromaChain",
    icon: <Image src={"/logo/X.svg"} width={30} height={30} alt="Logo X" />,
    label: "Join X",
  },
];

export function SocialMedia() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {items.map((item, i) => (
        <motion.a variants={cardVariants} href={item.href} key={i} target="_blank">
          <Button className="bg-white/10 border border-gray-700 w-full py-6 rounded-full">
            {item.icon}
            {item.label}
          </Button>
        </motion.a>
      ))}
    </motion.div>
  );
}
