import { fontOrbitron, fontPoppins } from "@/config/fonts";

export function Title() {
  return (
    <>
      <h3
        className={`${fontOrbitron.className} text-3xl lg:text-4xl text-white text-center font-bold`}
      >
        How to buy
      </h3>
      <p className={`${fontPoppins.className} text-[#A6A6A6] text-base lg:text-xl text-center font-medium`}>Buying TICS with ETH, BNB, USDT, USDC or BUSD</p>
    </>
  );
}
