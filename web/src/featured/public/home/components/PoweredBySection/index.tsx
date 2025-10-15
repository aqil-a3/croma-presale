"use client";

import { PoweredByCarousel } from "./Carousel";

export function PoweredBy() {
  return (
    <section className="relative z-10 pt-4">
      <p className="px-0 md:px-4 xl:px-[120px] font-semibold text-xl xl:text-2xl text-white text-center">
        Powered By
      </p>
      <div className="flex mt-4 py-4 w-screen justify-center bg-gradient-to-r from-[#B72204] to-[#FC6400]">
        <PoweredByCarousel />
      </div>
    </section>
  );
}