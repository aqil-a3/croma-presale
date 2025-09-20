import Image from "next/image";
import Link from "next/link";

const icons = [
  {
    href: "#",
    imageSrc: "/logo/twitter.svg",
  },
  {
    href: "#",
    imageSrc: "/logo/instagram.svg",
  },
  {
    href: "#",
    imageSrc: "/logo/facebook.svg",
  },
  {
    href: "#",
    imageSrc: "/logo/youtube.svg",
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
