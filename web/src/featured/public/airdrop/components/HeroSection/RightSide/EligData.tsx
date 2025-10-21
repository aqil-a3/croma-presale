import { MigrationPresaleDb } from "@/@types/migration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { fontOrbitron } from "@/config/fonts";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface Props {
  data: MigrationPresaleDb;
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

export function EligData({ data }: Props) {
  const minimumNftHave = 2;
  const isHaventBoughtCrm =
    data.source === "airdrop" &&
    data.airdrop_nft_tasks.length <= minimumNftHave;

  const notHaveNfts = data.airdrop_nft_tasks
    ? NFT_TASKS.filter((nft) => !data.airdrop_nft_tasks?.includes(nft))
    : [];

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
              {notHaveNfts.map((nft, i) => (
                <a href={NFT_TASKS_LINKS[nft]} target="_blank" key={i}>
                  <Badge key={i} className="text-yellow-400 border-yellow-400">
                    NFT {i + 1}
                  </Badge>
                </a>
              ))}
            </div>
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
