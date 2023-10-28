import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columnsProduct: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "shortDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "bestSellingRank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
  },
  {
    accessorKey: "manufacturer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string[];
      if (value.length === 0 || rowValue.length === 0) return false;
      return rowValue.some((x) => value.includes(x));
    },
    getUniqueValues: (rowData) => rowData["categories"],
  },
];
