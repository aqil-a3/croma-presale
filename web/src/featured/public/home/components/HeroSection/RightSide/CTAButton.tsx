import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import { useRightSideCTAButton } from "../../../hooks/useRightSideCTAButton";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  amountBuy: number;
  payCurrency: string;
}

export function RightSideCTAButton({ amountBuy, payCurrency }: Props) {
  const { isLoading, payHandler } = useRightSideCTAButton(amountBuy, payCurrency);

  return (
    <>
      <Button
        style={{
          background: "linear-gradient(90deg, #B72204 0%, #FC6400 100%)",
        }}
        disabled={isLoading}
        className={`${fontOrbitron.className} text-white w-full h-[60px]`}
        onClick={payHandler}
      >
        {isLoading ? <><Spinner /> PROCESSING...</> : "BUY NOW"}
      </Button>
    </>
  );
}
