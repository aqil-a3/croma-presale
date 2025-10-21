import { MigrationPresaleDb } from "@/@types/migration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fontOrbitron } from "@/config/fonts";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface Props {
  data: MigrationPresaleDb;
}

export function EligData({ data }: Props) {
  const isHaventBoughtCrm = data.source === "airdrop" && !data.is_valid;

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <p>Your total points</p>
      <p
        className={`${fontOrbitron.className} text-green-500 font-bold text-xl lg:text-4xl`}
      >
        {data.points} CRM
      </p>
      {data.is_valid && (
        <Alert className="bg-transparent text-green-500 border-green-500">
          <CheckCircle2Icon />
          <AlertTitle>Your Data is Valid!</AlertTitle>
          <AlertDescription className="text-green-400">
            Your CRM point will be added to your account
          </AlertDescription>
        </Alert>
      )}
      {isHaventBoughtCrm && (
        <Alert className="bg-transparent text-yellow-500 border-yellow-500">
          <AlertCircleIcon />
          <AlertTitle>Data Found!</AlertTitle>
          <AlertDescription className="text-yellow-400">
            Please buy our NFT to claim your CRM Points
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
