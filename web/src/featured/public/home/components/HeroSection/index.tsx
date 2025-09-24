import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

// HeroSection.tsx
export function HeroSection() {
  return (
    <section className="relative z-10">
      <div className="mx-auto lg:max-w-[1280px] lg:px-6 pt-[110px] block lg:grid gap-10 lg:grid-cols-[1fr_minmax(420px,520px)] items-center">
        <LeftSide />

        {/* Panel kanan ukuran tetap + nempel kanan */}
        <aside className="justify-self-end w-full lg:max-w-[520px] rounded-2xl gradient-1 croma-border-2 py-4 lg:p-6 space-y-6">
          <RightSide />
        </aside>
      </div>
    </section>
  );
}
