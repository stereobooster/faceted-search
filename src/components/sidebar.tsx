import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table as TableType } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface SidebarProps<TData> {
  className?: string;
  table: TableType<TData>;
}

export function Sidebar<TData>({ className, table }: SidebarProps<TData>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Price
          </h2>
          <div className="space-y-1">slider</div>
        </div>
        {table.getColumn("manufacturer") && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Manufacturer
            </h2>
            <div className="space-y-1">
              <DataTableFacetedFilter
                column={table.getColumn("manufacturer")}
                title="Manufacturer"
              />
            </div>
          </div>
        )}
        {table.getColumn("type") && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Manufacturer
            </h2>
            <div className="space-y-1">
              <DataTableFacetedFilter
                column={table.getColumn("type")}
                title="Type"
              />
            </div>
          </div>
        )}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">Checkboxes</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
