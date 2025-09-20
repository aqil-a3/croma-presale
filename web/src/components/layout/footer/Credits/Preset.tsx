import { fontPoppins } from "@/config/fonts";

export function Preset() {
  const year = new Date().getFullYear();

  return (
    <p
      className={`${fontPoppins.className} text-[#E9E9E980] text-xl text-right`}
    >
      © {year} CromaChain Foundation. All rights reserved.
    </p>
  );
}
