import { cn } from "@/lib/utils";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Table as TableType } from "@tanstack/react-table";
import { FacetedFilterCheckboxes } from "./FacetedFilterCheckboxes";
import { FacetedFilterSlider } from "./FacetedFilterSlider";

interface SidebarProps<TData> {
  className?: string;
  table: TableType<TData>;
}

export function Sidebar<TData>({ className, table }: SidebarProps<TData>) {
  const length = table.getRowModel().rows.length;
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {table.getColumn("salePrice") && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Price
            </h2>
            <div className="space-y-1">
              {length !== 0 && (
                <FacetedFilterSlider
                  column={table.getColumn("salePrice")}
                  title="Price"
                />
              )}
            </div>
          </div>
        )}
        {table.getColumn("manufacturer") && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Manufacturer
            </h2>
            <div className="space-y-1">
              {length !== 0 && (
                <FacetedFilterCheckboxes
                  column={table.getColumn("manufacturer")}
                  title="Manufacturer"
                />
              )}
            </div>
          </div>
        )}
        {table.getColumn("type") && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Type
            </h2>
            <div className="space-y-1">
              {length !== 0 && (
                <FacetedFilterCheckboxes
                  column={table.getColumn("type")}
                  title="Type"
                />
              )}
            </div>
          </div>
        )}
        {table.getColumn("categories") && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Category
            </h2>
            <div className="space-y-1">
              {length != 0 && (
                <FacetedFilterCheckboxes
                  column={table.getColumn("categories")}
                  title="Category"
                />
              )}
            </div>
          </div>
        )}
        {/* <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">Checkboxes</div>
          </ScrollArea>
        </div> */}
      </div>
    </div>
  );
}
