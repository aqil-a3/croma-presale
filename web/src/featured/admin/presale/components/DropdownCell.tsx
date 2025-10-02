import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { Menu } from "lucide-react";
import { useState } from "react";
import { PresaleEditDialog } from "./PresaleDialog";

export function DropdownMenuCell({ row }: { row: Row<PresaleDb> }) {
  const [editForm, setEditForm] = useState<boolean>(false);
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{row.original.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setEditForm(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <PresaleEditDialog open={editForm} setOpen={setEditForm} row={row} />
    </>
  );
}
