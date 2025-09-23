import { fontPoppins } from "@/config/fonts";

export function Preset() {
  const year = new Date().getFullYear();

  return (
    <p
      className={`${fontPoppins.className} text-[#E9E9E980] text-base lg:text-xl text-center lg:text-right`}
    >
      © {year} CromaChain Foundation. All rights reserved.
    </p>
  );
}
