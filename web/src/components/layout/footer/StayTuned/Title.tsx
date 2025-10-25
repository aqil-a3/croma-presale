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
        Stay connected with <span className="text-orange-400 font-medium">CROMA OFFICIAL</span> 
        — get the latest updates on our ecosystem and exclusive news powered by 
        <span className="text-orange-400 font-medium"> TRIXNEWS</span>.
      </p>
    </>
  );
}
