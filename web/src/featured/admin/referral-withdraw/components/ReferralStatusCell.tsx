"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface ReferralStatusCellProps {
  id: string;
  initialStatus: "pending" | "success" | "failed";
}

export function ReferralStatusCell({ id, initialStatus }: ReferralStatusCellProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const color =
    status === "success"
      ? "bg-green-500/20 text-green-400"
      : status === "pending"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400";

  const updateStatus = async (newStatus: typeof status) => {
    if (loading || newStatus === status) return;
    setLoading(true);
    try {
      // 🔧 Ganti endpoint ini sesuai backend kamu
      await axios.post("/api/admin/referral/update-status", {
        id,
        status: newStatus,
      });

      setStatus(newStatus);
      toast.success(`Status updated to "${newStatus}"`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={loading}
          className={`flex items-center gap-2 ${color} rounded-full px-3 py-1 text-xs font-medium capitalize`}
        >
          {loading && <Spinner /> }
          {status}
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => updateStatus("pending")}>
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateStatus("success")}>
          Success
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateStatus("failed")}>
          Failed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
