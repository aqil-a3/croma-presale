import { InvestmentDb } from "@/@types/investment";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Menu } from "lucide-react";

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
        <DropdownMenuItem>Detail</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
