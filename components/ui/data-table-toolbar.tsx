"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-options";
import useDataFetching from "@/hooks/CustomHooks";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { revenueProjectionTypes, revenueShareTypes, capTables } =
    useDataFetching();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("payoffMonth") && (
          <DataTableFacetedFilter
            column={table.getColumn("payoffMonth")}
            title="Early Payoff Month"
            options={capTables}
          />
        )}
        {table.getColumn("revenueProjectionType") && (
          <DataTableFacetedFilter
            column={table.getColumn("revenueProjectionType")}
            title="Revenue Projection Type"
            options={revenueProjectionTypes}
          />
        )}
        {table.getColumn("revenueShareType") && (
          <DataTableFacetedFilter
            column={table.getColumn("revenueShareType")}
            title="Revenue Share Type"
            options={revenueShareTypes}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="ml-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
