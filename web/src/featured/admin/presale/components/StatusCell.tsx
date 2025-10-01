import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Row } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { useState } from "react";

export function StatusCell({ row }: { row: Row<PresaleDb> }) {
  const status = row.original.is_active;
  const id = row.original.id;

  const [isActive, setIsActive] = useState<boolean>(status);
  const label = isActive ? "Active" : "Non Active";

  return (
    <div className="flex items-center space-x-2 justify-center">
      <Switch checked={isActive} onCheckedChange={() => setIsActive(!isActive)} id={`${id}-presale-status`} />
      <Label htmlFor={`${id}-presale-status`}>{label}</Label>
    </div>
  );
}
