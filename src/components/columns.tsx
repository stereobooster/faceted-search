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
    accessorKey: "bestSellingRank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "manufacturer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
  },  
  // thumbnailImage: z.string(),
  // url: z.string(),
  // image: z.string(),
  // objectID: z.string(),
  // shipping: z.string(),
  // customerReviewCount: z.number(),
];
