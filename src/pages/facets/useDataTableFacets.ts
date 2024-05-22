import { useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  Table,
} from "@tanstack/react-table";
import { defaultVisibilityFilter, facetsSchema } from "@/data/schema";
import { Facets, TQuickscoreIndex } from "@stereobooster/facets";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export const useDataTableFacets = <
  TData extends Record<string, unknown>,
  TValue
>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultVisibilityFilter
  );
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
          if (next.id === "salePrice" && Array.isArray(next.value)) {
            // @ts-expect-error xxx
            prev[next.id] = { from: next.value[0], to: next.value[1] };
          } else {
            prev[next.id] = next.value as string[];
          }
          return prev;
        }, {} as Record<string, string[]>),
    [columnFilters]
  );

  const term = useMemo(
    () => (columnFilters.find((x) => x.id === "name")?.value as string) || "",
    [columnFilters]
  );

  const facets = useMemo(
    () =>
      new Facets(
        {
          textIndex: TQuickscoreIndex,
          schema: facetsSchema,
        },
        data
      ),
    [data]
  );

  const result = useMemo(
    () =>
      facets.search({
        query: term,
        facetFilter: where,
        sort: sorting.length
          ? [sorting[0].id, sorting[0].desc ? "desc" : "asc"]
          : undefined,
        page: pagination.pageIndex,
        perPage: pagination.pageSize,
      }),
    [term, where, sorting, pagination.pageSize, pagination.pageIndex, facets]
  );

  const resultRef = useRef(result);
  try {
    resultRef.current = result;
  } catch (e) {
    // do nothing
  }

  const dataNew = useMemo(
    () => result.items || [],
    [result]
  ) as unknown as TData[];
  const count = result?.pagination.total;
  const pageCount =
    count !== undefined ? Math.ceil(count / pagination.pageSize) : -1;

  return useReactTable({
    data: dataNew,
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
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues:
      <TData>(_table: Table<TData>, columnId: keyof TData & string) =>
      () =>
        new Map(
          resultRef.current?.facets[columnId]?.items.map((x) => [x[0], x[1]])
        ),
    getFacetedMinMaxValues:
      <TData>(_table: Table<TData>, columnId: keyof TData & string) =>
      () => {
        const facet_stats = resultRef.current?.facets[columnId]?.stats;
        // @ts-expect-error xxx
        if (!facet_stats) return [] as [number, number];
        return [facet_stats.min, facet_stats.max];
      },
  });
};
