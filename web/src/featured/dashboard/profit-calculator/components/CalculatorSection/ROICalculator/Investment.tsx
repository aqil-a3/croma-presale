import { TokenInfo } from "./TokenInfo";

export function Investment() {
  return (
    <div className="">
      <TokenAndUSD />
    </div>
  );
}

const TokenAndUSD = () => {
  const tokenCRM = 1000;
  const investUSD = 100;
  return (
    <div className="grid grid-cols-2 gap-4">
      <TokenInfo title="CRM Tokens You Own" value={tokenCRM} currency="CRM" />
      <TokenInfo title="Your Investment (USD)" value={investUSD} currency="USD" />
    </div>
  );
};
