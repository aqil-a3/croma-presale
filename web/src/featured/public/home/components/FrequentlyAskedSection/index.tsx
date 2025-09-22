"use client";

import { Background } from "./Background";
import { Decor } from "./Decor";
import { FAQ } from "./FAQ";
import { Title } from "./Title";

export function FrequentlyAskedSection() {
  return (
    <section className="relative w-full mt-8 space-y-8">
      <Background />
      <Decor />

      <Title />
      <FAQ />
    </section>
  );
}
