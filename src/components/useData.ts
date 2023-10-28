import { useEffect, useState } from "react";
import { Product, defaultLimit, loadData } from "../data/schema";

export const useData = () => {
  const [data, setData] = useState([] as Product[]);
  useEffect(() => {
    loadData(defaultLimit).then(setData);
  }, []);
  return data;
};
