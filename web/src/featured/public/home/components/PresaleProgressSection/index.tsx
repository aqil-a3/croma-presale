import { fontOrbitron } from "@/config/fonts";
import { ProgressBar } from "./ProgressBar";
import { MetrixCard } from "./MetrixCard";
import Image from "next/image";
import { Background } from "./Background";
import { Decor } from "./Decor";
import { PANEL_BG } from "@/config/variables";

export function PresaleProgressSection() {
  return (
    <section className="relative w-full">
      <Background />
      <Decor />
      <div
        style={{
          background: PANEL_BG,
        }}
        className="w-full z-10 p-4 border border-orange-500/50 rounded-2xl space-y-6 relative mt-4 lg:mt-32"
      >
        <Image
          src={"/images/cromacoin-1.png"}
          alt="Cromacoin"
          width={240}
          height={223}
          className="hidden lg:block absolute right-0 top-0 -translate-y-32"
        />
        <Image
          src={"/images/cromacoin-1.png"}
          alt="Cromacoin"
          width={120}
          height={80}
          className="block lg:hidden absolute right-0 top-0 -translate-y-[40%] translate-x-[20%]"
        />
        <h2
          className={`${fontOrbitron.className} text-center text-white font-semibold text-xl lg:text-4xl`}
        >
          Presale Progress & <br /> Metrics
        </h2>
        <ProgressBar />
        <MetrixCard />
      </div>
    </section>
  );
}
