import { InvestmentLeaderboardItem } from "@/@types/investment";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  fakeBuyerData: InvestmentLeaderboardItem[];
}

export function FakeBuyerDataMapping({ fakeBuyerData }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const saveHandler = async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/setting/admin", {
        settingKey: "fake_top_buyers",
        value: fakeBuyerData,
      });
      toast.success(`Fake Buyers updated!`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (fakeBuyerData.length === 0)
    return (
      <div className="space-y-6">
        <Card className="border-dashed border-gray-400 text-center py-10">
          <CardContent>
            <p className="text-gray-500">No Fake Buyer Data</p>
          </CardContent>
        </Card>
        <Button disabled={isLoading} onClick={saveHandler}>
          {isLoading ? "Saving..." : `Save ${fakeBuyerData.length} data`}
        </Button>
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <div className="p-0">
        <ScrollArea className="h-60">
          <div className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium px-4 py-2 rounded-t-md">
            <p>Username</p>
            <p>Wallet Address</p>
            <p className="text-right">Total Invested (USD)</p>
          </div>

          <Separator />

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {fakeBuyerData.map((data, i) => (
              <div
                key={data.wallet_address}
                className="grid grid-cols-3 items-center px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    #{i + 1}
                  </Badge>
                  <span className="font-medium">
                    {data.username ?? "Anonymous"}
                  </span>
                </div>

                <p className="truncate font-mono text-gray-700 dark:text-gray-300">
                  {data.wallet_address}
                </p>

                <p className="text-right font-semibold text-gray-900 dark:text-gray-100">
                  $
                  {data.total_invested_usd.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <Button disabled={isLoading} onClick={saveHandler}>
        {isLoading ? "Saving..." : `Save ${fakeBuyerData.length} data`}
      </Button>
    </div>
  );
}
