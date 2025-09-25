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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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
    <div className="rounded-md">
      <Table className="w-full border-separate border-spacing-y-3">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
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
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    `backdrop-blur-3xl h-[60px] text-white text-center rounded-2xl`
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
