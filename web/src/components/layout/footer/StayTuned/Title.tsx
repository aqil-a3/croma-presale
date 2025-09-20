import { fontOrbitron, fontPoppins } from "@/config/fonts";

export function Title() {
  return (
    <>
      <h3
        className={`${fontOrbitron.className} text-white font-semibold text-4xl`}
      >
        Stay Tuned
      </h3>
      <p className={`${fontPoppins.className} text-[#FFFFFFCC] text-lg`}>
        Subscribe to receive updates on XVA presale and the latest news from
        Nova.
      </p>
    </>
  );
}
