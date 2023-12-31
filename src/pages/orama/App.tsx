import { columnsProduct } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Sidebar } from "@/components/sidebar";

import { useDataTableOrama } from "@/pages/orama/useDataTableOrama";

export default function App() {
  const table = useDataTableOrama({ columns: columnsProduct });

  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar table={table} />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <DataTable table={table} columns={columnsProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
