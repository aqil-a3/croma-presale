import { AssetSelect } from "@/components/molecules/select/AssetSelect";
import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import CurrencyInput from "react-currency-input-field";

import Image from "next/image";
import React from "react";
import { usePublicPresaleContext } from "../../../provider";
import { formatNumber } from "@/utils/formatNumber";

interface Props {
  usd: number;
  setUsd: React.Dispatch<React.SetStateAction<number>>;
  asset: string;
  setAsset: React.Dispatch<React.SetStateAction<string>>;
}

export function RightSidePayReceive({ setUsd, usd, asset, setAsset }: Props) {
  return (
    <div className="space-y-4">
      <PayComp setUsd={setUsd} usd={usd} asset={asset} setAsset={setAsset} />
      <RecComp usd={usd} />
    </div>
  );
}

const PayComp: React.FC<Props> = ({ setUsd, usd, asset, setAsset }) => {
  const { cryptoPrice, paymentMethods } = usePublicPresaleContext();
  const cPrice = usd / cryptoPrice[asset];

  return (
    <div
      style={{
        background:
          "linear-gradient(88.3deg, rgba(255, 255, 255, 0.083) 0%, rgba(255, 255, 255, 0.044) 99.66%)",
        backdropFilter: "blur(64px)",
      }}
      className="h-28 w-full rounded-2xl opacity-90 p-2 lg:p-4"
    >
      <p
        className={`${fontPoppins.className} text-sm lg:text-base text-white font-medium`}
      >
        You Pay (USD)
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start justify-center">
          <CurrencyInput
            className={`${fontPoppins.className} w-[200px] font-bold text-lg lg:text-2xl text-white outline-none`}
            prefix="$"
            allowDecimals={true}
            decimalSeparator="."
            groupSeparator=","
            value={usd}
            maxLength={10}
            onValueChange={(value) => {
              setUsd(value as unknown as number);
            }}
          />
          <p
            className={`${fontPoppins.className} text-[#79869B] text-sm lg:text-base font-medium`}
          >
            {formatNumber(cPrice)}
          </p>
        </div>

        <AssetSelect
          options={paymentMethods.value}
          value={asset}
          onChange={setAsset}
        />
      </div>
    </div>
  );
};

const RecComp: React.FC<{ usd: number }> = ({ usd }) => {
  const { activePresale } = usePublicPresaleContext();
  const currPrice = activePresale.current_price_usd;
  const crmValue = usd / currPrice;

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
          {formatNumber(crmValue)}
        </p>

        <Button className="bg-[#FFFFFF12] w-[134px] h-12 rounded-2xl ">
          <Image
            width={24}
            height={24}
            alt="Croma Icon"
            src={"/logo/crm-coin.png"}
          />{" "}
          CRM
        </Button>
      </div>
    </div>
  );
};
