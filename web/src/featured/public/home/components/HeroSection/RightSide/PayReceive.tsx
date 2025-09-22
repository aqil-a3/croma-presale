import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function RightSidePayReceive() {
  return (
    <div className="space-y-4">
      <PayComp />
      <RecComp />
    </div>
  );
}

const PayComp = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(88.3deg, rgba(255, 255, 255, 0.083) 0%, rgba(255, 255, 255, 0.044) 99.66%)",
        backdropFilter: "blur(64px)",
      }}
      className="h-28 w-full rounded-2xl opacity-90 p-4"
    >
      <p className={`${fontPoppins.className} text-white font-medium`}>
        You Pay (USD)
      </p>
      <div className="flex justify-between items-center">
        <div className="space-x-0.5">
          <p
            className={`${fontPoppins.className} font-bold text-2xl text-white`}
          >
            $0.00
          </p>
          <p
            className={`${fontPoppins.className} text-[#79869B] text-base font-medium`}
          >
            0.000
          </p>
        </div>

        <Button className="bg-[#FFFFFF12] w-[134px] h-12 rounded-2xl ">
          <Image width={24} height={24} alt="Eth Icon" src={"/logo/eth.png"} />{" "}
          ETH <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

const RecComp = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(88.3deg, rgba(255, 255, 255, 0.083) 0%, rgba(255, 255, 255, 0.044) 99.66%)",
        backdropFilter: "blur(64px)",
      }}
      className="h-28 w-full rounded-2xl opacity-90 p-4"
    >
      <p className={`${fontPoppins.className} text-white font-medium`}>
        You Receive
      </p>
      <div className="flex justify-between items-center">
        <p className={`${fontPoppins.className} font-bold text-2xl text-white`}>
          0.00
        </p>

        <Button className="bg-[#FFFFFF12] w-[134px] h-12 rounded-2xl ">
          <Image
            width={24}
            height={24}
            alt="Croma Icon"
            src={"/logo/croma.png"}
          />{" "}
          CRM <ChevronDown />
        </Button>
      </div>
    </div>
  );
};
