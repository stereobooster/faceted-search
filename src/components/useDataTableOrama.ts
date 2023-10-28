import { useEffect, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  useReactTable,
  Table,
} from "@tanstack/react-table";
import { useSearch } from "./useSearch";
import { Product } from "@/data/schema";
import { Orama, SorterParams } from "@orama/orama";

interface DataTableProps {
  columns: ColumnDef<Product>[];
}

const options = {
  getCoreRowModel: getCoreRowModel(),
  // TODO: replace those
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
};

export const useDataTableOrama = ({ columns }: DataTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    name: true,
    shortDescription: true,
    salePrice: true,
    bestSellingRank: false,
    manufacturer: false,
    type: false,
    salePrice_range: false,
    categories: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const where = useMemo(
    () =>
      columnFilters
        .filter((x) => x.id !== "name")
        .reduce((prev, next) => {
          prev[next.id] = next.value as string[];
          return prev;
        }, {} as Record<string, string[]>),
    [columnFilters]
  );

  const sortBy = useMemo(() => {
    if (sorting.length === 0) return;
    return {
      property: sorting[0].id,
      order: sorting[0].desc ? "DESC" : "ASC",
    } as SorterParams<Orama<Product>>;
  }, [sorting]);

  const term = useMemo(
    () => (columnFilters.find((x) => x.id === "name")?.value as string) || "",
    [columnFilters]
  );

  const result = useSearch({
    term,
    where,
    sortBy,
    limit: pagination.pageSize,
    offset: pagination.pageIndex,
  });
  const resultRef = useRef(result);
  useEffect(() => {
    resultRef.current = result;
  }, [result]);
  const data = useMemo(
    () => result?.hits?.map((x) => x.document) || [],
    [result]
  );
  const count = result?.count;
  const pageCount =
    count !== undefined ? Math.ceil(count / pagination.pageSize) : -1;

  return useReactTable({
    data,
    // @ts-expect-error xxx
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    pageCount,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    ...options,
    getFacetedUniqueValues:
      <TData>(_table: Table<TData>, columnId: string) =>
      () =>
        new Map(
          Object.entries(resultRef.current?.facets![columnId]?.values || {})
        ),
  });
};
