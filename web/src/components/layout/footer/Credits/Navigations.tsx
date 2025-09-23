import { fontPoppins } from "@/config/fonts";
import Link from "next/link";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Airdrop",
    href: "/airdrop",
  },
  {
    label: "Refferal",
    href: "/refferal",
  },
  {
    label: "Terms",
    href: "/terms",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Find Us",
    href: "/find-us",
  },
];

export function FooterNavigations() {
  return (
    <div className="flex flex-wrap gap-x-20 gap-y-8 justify-start lg:justify-end">
      {links.map((link) => (
        <Link href={link.href} key={link.href} className={`${fontPoppins.className} text-base lg:text-xl text-white`} >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
