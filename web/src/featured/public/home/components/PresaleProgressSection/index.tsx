import { fontOrbitron } from "@/config/fonts";
import { ProgressBar } from "./ProgressBar";
import { MetrixCard } from "./MetrixCard";
import Image from "next/image";
import { Background } from "./Background";
import { Decor } from "./Decor";

export function PresaleProgressSection() {
  return (
    <section className="relative w-full">
      <Background />
      <Decor />
      <div
        style={{
          background: `linear-gradient(0deg, rgba(40, 50, 65, 0), rgba(40, 50, 65, 0)), linear-gradient(0deg, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)), linear-gradient(0deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))`,
        }}
        className="w-full z-10 p-4 border border-orange-500/50 rounded-2xl space-y-6 relative mt-32"
      >
        <Image
          src={"/images/cromacoin-1.png"}
          alt="Cromacoin"
          width={240}
          height={223}
          className="absolute right-0 top-0 -translate-y-32"
        />
        <h2
          className={`${fontOrbitron.className} text-center text-white font-semibold text-4xl`}
        >
          Presale Progress & Metrics
        </h2>
        <ProgressBar />
        <MetrixCard />
      </div>
    </section>
  );
}
