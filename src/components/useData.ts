import { useEffect, useState } from "react";
import { Product, productSchema } from "../data/schema";

export const useData = () => {
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