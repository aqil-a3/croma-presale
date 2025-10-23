import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Menu } from "lucide-react";
import { InvestmentDb } from "@/@types/investment";
import { DetailDialog } from "./DetailDialog";

export function TransactionCellMenu({ row }: { row: Row<InvestmentDb> }) {
  const data = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Order ID : {data.order_id}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DetailDialog data={data} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
