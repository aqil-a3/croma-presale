"use client";
import { HeaderCTAButton } from "./CTAButton";
import { HeaderLogo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { HeaderNavigation } from "./Navigation";

export default function Header() {
  return (
    <header
      style={{
        background:
          "linear-gradient(0deg, rgba(25, 5, 7, 0.54), rgba(25, 5, 7, 0.54)),linear-gradient(0deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07))",
      }}
      className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[95%] z-50 bg-linear-to-r from-[#FFFFFF12] via-[#00000047] to-[#1905078A] rounded-2xl border border-white p-4 flex justify-between items-center"
    >
      <HeaderLogo />
      <HeaderNavigation />
      <HeaderCTAButton />
      <MobileMenu />
    </header>
  );
}
