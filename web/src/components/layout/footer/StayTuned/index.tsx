import { Title } from "./Title";
import { StayTunedForm } from "./Form";
import Image from "next/image";

export function Staytuned() {
  return (
    <div className="relative w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl p-12 bg-gradient-to-r from-[#B72204] to-[#FC6400]">
      {/* kiri */}
      <div className="relative z-10">
        <Title />
        <StayTunedForm />
      </div>

      <figure className="absolute top-0 right-0 -translate-y-[20%] translate-x-[1%] w-full min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] xl:min-h-[500px]">
        <Image
          src="/images/staytuned-section.png"
          alt="Stay tuned image"
          fill
          priority
          // jangan object-fill, agar tidak distorsi
          className="object-contain object-right"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </figure>
    </div>
  );
}
