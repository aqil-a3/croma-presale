import { InvestmentLeaderboardItem } from "@/@types/investment";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FakeBuyerForm } from "./FakeBuyerForm";
import { useState } from "react";
import { FakeBuyerDataMapping } from "./FakeBuyerDataMapping";

interface Props {
  fakeBuyers: InvestmentLeaderboardItem[];
}

export function FakeBuyerSheet({ fakeBuyers }: Props) {
  const [fakeBuyerData, setFakeBuyerData] =
    useState<InvestmentLeaderboardItem[]>(fakeBuyers);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="text-black">
          {fakeBuyers.length} Data
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-3/4">
        <SheetHeader>
          <SheetTitle>Edit Fake Top Buyer</SheetTitle>
          <SheetDescription>Edit here</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 p-4 gap-4">
          <FakeBuyerDataMapping fakeBuyerData={fakeBuyerData} />
          <FakeBuyerForm setData={setFakeBuyerData} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
