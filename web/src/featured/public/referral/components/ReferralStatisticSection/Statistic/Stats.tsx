import { PannelOrangeContainer } from "@/components/layout/container/PanelOrangeContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatCurrency } from "@/utils/formatCurrency";
import { useReferralContext } from "../../../provider";
import { UserReferralStatistic } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useState } from "react";
import { WithdrawDialog } from "@/components/molecules/dialog/WithdrawDialog";

interface StatusType {
  value: string | number;
  label: string;
}

const dummyItems: StatusType[] = [
  {
    label: "Total Referrals",
    value: "11",
  },
  {
    label: "Total Earned",
    value: 51945,
  },
  {
    label: "Current Tier",
    value: "Silver",
  },
  {
    label: "Available to Claim",
    value: 71945,
  },
];

const getItems = (
  userStatistic: UserReferralStatistic | null
): StatusType[] => {
  if (!userStatistic) return dummyItems;

  return [
    {
      label: "Total Referrals",
      value: userStatistic.total_referrals.toString(),
    },
    {
      label: "Total Earned",
      value: userStatistic.total_earned,
    },
    {
      label: "Current Tier",
      value: userStatistic.current_tier,
    },
    {
      label: "Available to Claim",
      value: userStatistic.available_to_claim,
    },
  ];
};

export function Stats() {
  const { userStatistic, userData } = useReferralContext();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const items = getItems(userStatistic);
  const withdrawHandler = () => {
    if (!userStatistic || !userData) return;
    setOpenDialog(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, i) => {
        return (
          <PannelOrangeContainer key={i}>
            <p
              className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-xl lg:text-3xl`}
            >
              {typeof item.value === "number"
                ? formatCurrency(item.value)
                : item.value}
            </p>
            <p
              className={`${fontPoppins.className} font-semibold text-white text-sm lg:text-base text-center`}
            >
              {item.label}
            </p>
          </PannelOrangeContainer>
        );
      })}
      {userStatistic && userData && (
        <>
          <Button
            onClick={withdrawHandler}
            disabled={userStatistic.available_to_claim <= 50}
            className="col-span-2 bg-orange-500 hover:bg-orange-500"
          >
            <Gift /> Withdraw{" "}
            {userStatistic.available_to_claim <= 50 && "(Min. $50)"}
          </Button>

          <WithdrawDialog
            open={openDialog}
            setOpen={setOpenDialog}
            maxAmount={userStatistic.available_to_claim}
            walletAddress={userData.wallet_address}
          />
        </>
      )}
    </div>
  );
}
