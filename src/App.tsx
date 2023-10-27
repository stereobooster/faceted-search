import { useEffect, useState } from "react";
import { columnsProduct } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Sidebar } from "@/components/sidebar";
import { Product, productSchema } from "./data/schema";
import { useDataTable } from "./components/useDataTable";

const useData = () => {
  const [data, setData] = useState([] as Product[]);
  useEffect(() => {
    fetch("/ecommerce/bestbuy_seo.json")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        setData(
          // @ts-expect-error xxx
          data
            .map((x) => {
              try {
                return productSchema.parse(x);
              } catch (e) {
                return;
              }
            })
            .filter(Boolean)
        );
      });
  }, []);

  return data;
};

export default function App() {
  const data = useData();
  const table = useDataTable({ data, columns: columnsProduct });

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
