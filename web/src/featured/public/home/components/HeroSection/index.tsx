import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

// HeroSection.tsx
export function HeroSection() {
  return (
    <section className="relative z-10">
      <div className=" mx-auto max-w-[1280px] px-6 pt-[110px] grid gap-10 grid-cols-1 lg:grid-cols-[1fr_minmax(420px,520px)] items-center">
        <div className="space-y-6">
          <LeftSide />
        </div>

        {/* Panel kanan ukuran tetap + nempel kanan */}
        <aside className="justify-self-end w-full max-w-[520px] rounded-2xl gradient-1 croma-border-2 p-6 space-y-6">
          <RightSide />
        </aside>
      </div>
    </section>
  );
}
