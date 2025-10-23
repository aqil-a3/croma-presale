import { ColumnDef } from "@tanstack/react-table";
import { FaqClient } from "../interface";
import { FaqDropDownMenu } from "./FaqDropDownMenu";

export const AdminFaqColumns: ColumnDef<FaqClient>[] = [
  {
    accessorKey: "menu",
    header: "Action",
    cell: ({ row }) => <FaqDropDownMenu row={row} />,
  },
  {
    accessorKey: "title",
    header: "Question",
  },
];
