import { BuyCRMDialog } from "@/components/molecules/dialog/BuyCRMDialog";
import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

interface Props {
  amountBuy: number;
  payCurrency: string;
}

export function RightSideCTAButton({ amountBuy, payCurrency }: Props) {
  const { address } = useAccount();
  const [open, setOpen] = useState<boolean>(false);

  const clickHandler = () => {
    if (!address)
      return toast.error(
        "You have to connect your wallet to continue this action"
      );
    setOpen(true);
  };
  return (
    <>
      <Button
        style={{
          background: "linear-gradient(90deg, #B72204 0%, #FC6400 100%)",
        }}
        className={`${fontOrbitron.className} text-white w-full h-[60px]`}
        onClick={clickHandler}
      >
        BUY NOW
      </Button>
      <BuyCRMDialog
        amountBuy={amountBuy}
        payCurrency={payCurrency}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
