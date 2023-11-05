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
import ItemsJS from "@stereobooster/itemsjs";
import {
  defaultVisibilityFilter,
  itemsJsFacets,
  searchFields,
} from "@/data/schema";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export const useDataTableItemsjs = <TData extends Record<string, unknown>, TValue>({
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
          prev[next.id] = next.value as string[];
          return prev;
        }, {} as Record<string, string[]>),
    [columnFilters]
  );

  const sortBy = useMemo(() => {
    if (sorting.length === 0) return;
    return `${sorting[0].id}_${sorting[0].desc ? "desc" : "asc"}`;
  }, [sorting]);

  const term = useMemo(
    () => (columnFilters.find((x) => x.id === "name")?.value as string) || "",
    [columnFilters]
  );

  const itemsjs = useMemo(
    () =>
      ItemsJS(data, {
        searchableFields: searchFields,
        aggregations: itemsJsFacets,
      }),
    [data]
  );

  const result = useMemo(
    () =>
      itemsjs.search({
        query: term.length < 2 ? "" : term,
        filters: where,
        sort: sortBy,
        page: pagination.pageIndex + 1,
        per_page: pagination.pageSize,
      }),
    [term, where, sortBy, pagination.pageSize, pagination.pageIndex, itemsjs]
  );

  const resultRef = useRef(result);
  try {
    resultRef.current = result;
  } catch (e) {
    // do nothing
  }

  const dataNew = useMemo(() => result.data.items || [], [result]) as unknown as TData[];
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
          // @ts-expect-error xxx
          resultRef.current?.data.aggregations[columnId]?.buckets.map((x) => [
            x["key"],
            x["doc_count"],
          ])
        ),
    getFacetedMinMaxValues:
      <TData>(_table: Table<TData>, columnId: keyof TData & string) =>
      () => {
        const facet_stats =
        // @ts-expect-error xxx
          resultRef.current?.data.aggregations[columnId]?.facet_stats;
        // @ts-expect-error xxx
        if (!facet_stats) return [] as [number, number];
        return [facet_stats.min, facet_stats.max];
      },
  });
};
