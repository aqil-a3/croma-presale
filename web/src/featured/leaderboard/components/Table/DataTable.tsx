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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { TopBuyerWithRanks } from "@/@types/user";

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
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`${fontPoppins.className} text-white text-[20px] font-medium text-center`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const data: TopBuyerWithRanks =
                row.original as unknown as TopBuyerWithRanks;
              const isFirstRank = data.rank === 1;
              const isSecondRank = data.rank === 2;
              const isThirdRank = data.rank === 3;

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    `${OTHER_RANK_BG} backdrop-blur-3xl h-[60px] text-white text-center rounded-2xl`,
                    isThirdRank && `${THIRD_RANK_BG}`,
                    isSecondRank && `${SECOND_RANK_BG}`,
                    isFirstRank && `${FIRST_RANK_BG}`
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
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
