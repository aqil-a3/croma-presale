import { MigrationPresaleDb } from "@/@types/migration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import axios, { isAxiosError } from "axios";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  data: MigrationPresaleDb;
  setData: React.Dispatch<React.SetStateAction<MigrationPresaleDb | null>>;
}

const NFT_TASKS = [
  "f7f89788-d176-4d8c-a5e4-f87f4500bb1e",
  "4038bc6d-a2ce-4bb1-8ced-9e91468197b1",
  "ee74e98e-eb6b-4dbf-afd6-a02550489573",
  "11f4a316-5a69-4893-b70e-79e260c2aca3",
];

const NFT_TASKS_LINKS: Record<string, string> = {
  "f7f89788-d176-4d8c-a5e4-f87f4500bb1e":
    "https://opensea.io/item/base/0x1d53b6c882ac7fbd5ea0eeca00d59b843ef50525/8",
  "4038bc6d-a2ce-4bb1-8ced-9e91468197b1":
    "https://opensea.io/item/base/0x1d53b6c882ac7fbd5ea0eeca00d59b843ef50525/9",
  "ee74e98e-eb6b-4dbf-afd6-a02550489573":
    "https://opensea.io/item/base/0x1d53b6c882ac7fbd5ea0eeca00d59b843ef50525/12",
  "11f4a316-5a69-4893-b70e-79e260c2aca3":
    "https://opensea.io/item/base/0x1d53b6c882ac7fbd5ea0eeca00d59b843ef50525/10",
};

export function EligData({ data, setData }: Props) {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const minimumNftHave = 2;
  const isHaventBoughtCrm =
    data.source === "airdrop" && data.airdrop_nft_tasks.length < minimumNftHave;

  const notHaveNfts = data.airdrop_nft_tasks
    ? NFT_TASKS.filter((nft) => !data.airdrop_nft_tasks?.includes(nft))
    : [];

  const updateHandler = async () => {
    try {
      setIsChecking(true);
      const { data: apiData } = await axios.patch(
        `/api/airdrop/update?address=${data.wallet_address}`
      );
      const migrationData: MigrationPresaleDb = apiData.data;
      setData(migrationData);
      toast.success("Update Success");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Something Error");
        return;
      }
      toast.error("Somethng error");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <p>Your total points</p>
      <p
        className={`${fontOrbitron.className} text-green-500 font-bold text-xl lg:text-4xl`}
      >
        {data.points} CRM
      </p>
      {isHaventBoughtCrm ? (
        <Alert className="bg-transparent text-yellow-500 border-yellow-500">
          <AlertCircleIcon />
          <AlertTitle>Almost Eligible!</AlertTitle>
          <AlertDescription className="text-yellow-400">
            You currently {data.airdrop_nft_tasks.length} NFT. Once you hold at
            least 2 NFTs, CRM points will be automatically credited to your
            presale account. Nft you dont have:
            <div className="flex gap-4 mt-4">
              {notHaveNfts.map((nft, i) => {
                const token = NFT_TASKS_LINKS[nft].split("/").at(-1);
                return (
                  <a href={NFT_TASKS_LINKS[nft]} target="_blank" key={i}>
                    <Badge
                      key={i}
                      className="text-yellow-400 border-yellow-400"
                    >
                      Token {token}
                    </Badge>
                  </a>
                );
              })}
            </div>
            <Button
              className="block w-full bg-transparent text-yellow-400 border border-yellow-400 mt-4"
              disabled={isChecking}
              onClick={updateHandler}
              type="button"
            >
              {isChecking ? "Checking..." : "I Have Buy 2 NFTs"}
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-transparent text-green-500 border-green-500">
          <CheckCircle2Icon />
          <AlertTitle>Eligibility Confirmed</AlertTitle>
          <AlertDescription className="text-green-400">
            Your CRM point will be will be credited to your account during the
            presale phase.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
