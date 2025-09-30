"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
// NOTE: kita tidak pakai TableBody/TableRow bawaan agar bisa pakai motion.tbody/tr
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { TopBuyerWithRanks } from "@/@types/user";
import { motion } from "framer-motion";
import { cardVariants, containerVariants, fadeUp } from "@/lib/variants";
// sesuaikan path import berikut dengan lokasi varian Anda

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const FIRST_RANK_BG =
  "bg-[linear-gradient(88.3deg,rgba(255,184,0,0.83)_0%,rgba(255,202,26,0.44)_99.66%)]";
const SECOND_RANK_BG =
  "bg-[linear-gradient(88.3deg,rgba(231,243,244,0.83)_0%,rgba(215,252,255,0.44)_99.66%)]";
const THIRD_RANK_BG =
  "bg-[linear-gradient(88.3deg,rgba(181,120,106,0.83)_0%,#A86556_99.66%)]";
const OTHER_RANK_BG =
  "bg-[linear-gradient(88.3deg,rgba(255,255,255,0.083)_0%,rgba(255,255,255,0.044)_99.66%)]";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md">
      <Table className="w-full border-separate border-spacing-y-3">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <motion.tr
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`${fontPoppins.className} text-white text-sm lg:text-xl font-medium text-center`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </motion.tr>
          ))}
        </TableHeader>

        {/* Container untuk stagger */}
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ amount: 0.2 }}
          className="[&_tr:last-child]:border-0"
        >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const rowData = row.original as unknown as TopBuyerWithRanks;
              const isFirstRank = rowData.rank === 1;
              const isSecondRank = rowData.rank === 2;
              const isThirdRank = rowData.rank === 3;

              return (
                <motion.tr
                  key={row.id}
                  variants={cardVariants}
                  data-state={row.getIsSelected() && "selected"}
                  // salin gaya dasar TableRow shadcn + gaya Anda
                  className={cn(
                    "border-b transition-colors hover:bg-white/5 data-[state=selected]:bg-white/10",
                    "backdrop-blur-3xl h-[60px] text-white text-center rounded-2xl",
                    OTHER_RANK_BG,
                    isThirdRank && THIRD_RANK_BG,
                    isSecondRank && SECOND_RANK_BG,
                    isFirstRank && FIRST_RANK_BG
                  )}
                >
                  {row.getVisibleCells().map((cell, i, arr) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "my-4",
                        i === 0 && "rounded-l-2xl",
                        i === arr.length - 1 && "rounded-r-2xl"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </motion.tr>
              );
            })
          ) : (
            <tr>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </tr>
          )}
        </motion.tbody>
      </Table>

      {/* Pagination (opsional tambahkan animasi kalau mau) */}
      <div className="flex items-center justify-end gap-2 py-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white disabled:opacity-40"
        >
          &lt;
        </button>

        {Array.from({ length: table.getPageCount() }).map((_, i) => {
          const isActive = i === table.getState().pagination.pageIndex;
          return (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold",
                isActive
                  ? "bg-gradient-to-r from-[#B72204] to-[#FC6400]"
                  : "bg-black/40"
              )}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white disabled:opacity-40"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
