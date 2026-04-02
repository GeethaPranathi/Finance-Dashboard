"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, Trash } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUserRole } from "@/hooks/use-get-user-role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfirm } from "@/hooks/use-confirm";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  onDelete: (rows: Row<TData>[]) => void;
  disabled?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled,
}: DataTableProps<TData, TValue>) {
  const role = useGetUserRole();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to perform a bulk delete."
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, rowSelection },
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount    = table.getFilteredRowModel().rows.length;
  const currentPage   = table.getState().pagination.pageIndex + 1;
  const totalPages    = table.getPageCount();

  return (
    <div>
      <ConfirmDialog />

      {/* Toolbar */}
      <div className="flex items-center gap-x-3 py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <Input
            placeholder={`Search ${filterKey}…`}
            value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn(filterKey)?.setFilterValue(e.target.value)}
            className="pl-9 rounded-xl border-gray-200 bg-white text-sm shadow-sm focus-visible:ring-indigo-500"
          />
        </div>

        {selectedCount > 0 && role !== "viewer" && (
          <Button
            disabled={disabled}
            size="sm"
            variant="destructive"
            className="ml-auto gap-x-2 rounded-xl bg-rose-500 text-xs font-medium hover:bg-rose-600"
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                onDelete(table.getFilteredSelectedRowModel().rows);
                table.resetRowSelection();
              }
            }}
          >
            <Trash className="size-3.5" />
            Delete ({selectedCount})
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-100 bg-gray-50/70 hover:bg-gray-50/70"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={[
                    "border-b border-gray-50 transition-colors",
                    "hover:bg-indigo-50/30",
                    "data-[state=selected]:bg-indigo-50 data-[state=selected]:border-l-2 data-[state=selected]:border-l-indigo-400",
                    i % 2 === 0 ? "" : "bg-gray-50/40",
                  ].join(" ")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-y-2 text-gray-400">
                    <Search className="size-5" />
                    <p className="text-sm">No results found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-xs text-gray-400">
          {selectedCount > 0 ? (
            <>{selectedCount} of {totalCount} selected</>
          ) : (
            <>{totalCount} row{totalCount !== 1 ? "s" : ""}</>
          )}
        </p>

        <div className="flex items-center gap-x-2">
          <p className="text-xs text-gray-400">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex items-center gap-x-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
