import Image from "next/image";
import Link from "next/link";

const icons = [
  {
    href: "https://x.com/CromaChain",
    imageSrc: "/logo/X.svg",
  },
  {
    href: "https://discord.com/invite/SWj8TWfu9k",
    imageSrc: "/logo/discord.svg",
  },
  {
    href: "https://t.me/Cromaartofficial",
    imageSrc: "/logo/telegram.svg",
  },
];

export function SocialMedia() {
  return (
    <div className="flex gap-4">
      {icons.map((icon, index) => (
        <Link key={index} href={icon.href}>
          <Image
            alt={icon.imageSrc}
            src={icon.imageSrc}
            width={40}
            height={40}
          />
        </Link>
      ))}
    </div>
  );
}
