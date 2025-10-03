import { ColumnDef } from "@tanstack/react-table";
import { FaqClient } from "../interface";

export const AdminFaqColumns: ColumnDef<FaqClient>[] = [
  {
    accessorKey: "title",
    header: "Question",
  },
];
