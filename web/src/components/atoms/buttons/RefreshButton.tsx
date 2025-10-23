"use client";

import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function RefreshButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setIsRefreshing(false);
      toast.info("Page refreshed")
    }, 800);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleRefresh}
      className="border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
      disabled={isRefreshing}
    >
      <RotateCcw
        className={`h-4 w-4 transition-transform duration-500 ${
          isRefreshing ? "animate-spin" : ""
        }`}
      />
    </Button>
  );
}
