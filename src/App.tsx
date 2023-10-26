import { columnsProduct } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Product, productSchema } from "./data/schema";
import { useEffect, useState } from "react";

const useData = () => {
  const [data, setData] = useState([] as Product[]);
  useEffect(() => {
    fetch("/ecommerce/bestbuy_seo.json")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        setData(
          // @ts-expect-error xxx
          data.map((x) => {
            try {
              return productSchema.parse(x);
            } catch (e) {
              return
            }
          }).filter(Boolean)
        );
      });
  }, []);

  return data;
};

export default function App() {
  const data = useData();

  return (
    <div className="flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={data} columns={columnsProduct} />
    </div>
  );
}
