import React, { Dispatch, SetStateAction } from "react";
import { TokenInfo } from "./TokenInfo";

interface Props {
  tokenCRM: number;
  setTokenCRM: Dispatch<SetStateAction<number>>;
  investUSD: number;
  setInvestUSD: Dispatch<SetStateAction<number>>;
}

export function Investment({
  investUSD,
  setInvestUSD,
  setTokenCRM,
  tokenCRM,
}: Props) {
  return (
    <TokenAndUSD
      investUSD={investUSD}
      setInvestUSD={setInvestUSD}
      setTokenCRM={setTokenCRM}
      tokenCRM={tokenCRM}
    />
  );
}

const TokenAndUSD: React.FC<Props> = ({
  investUSD,
  setInvestUSD,
  setTokenCRM,
  tokenCRM,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TokenInfo
        title="CRM Tokens You Own"
        value={tokenCRM}
        currency="CRM"
        setValue={setTokenCRM}
      />
      <TokenInfo
        title="Your Investment (USD)"
        value={investUSD}
        currency="USD"
        setValue={setInvestUSD}
      />
    </div>
  );
};
