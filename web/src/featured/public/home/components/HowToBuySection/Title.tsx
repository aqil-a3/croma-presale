import { fontOrbitron, fontPoppins } from "@/config/fonts";

export function Title() {
  return (
    <>
      <h3
        className={`${fontOrbitron.className} text-[40px] text-white text-center font-bold`}
      >
        How to buy
      </h3>
      <p className={`${fontPoppins.className} text-[#A6A6A6] text-[20px] text-center font-medium`}>Buying TICS with ETH, BNB, USDT, USDC or BUSD</p>
    </>
  );
}
