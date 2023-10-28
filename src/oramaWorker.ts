import { expose } from "comlink";
import { Product, productSchema } from "./data/schema";
import {
  SearchParams,
  TypedDocument,
  Results,
  create,
  insertMultiple,
  search,
} from "@orama/orama";

export const ecomerceDB = await create({
  schema: {
    name: "string",
    shortDescription: "string",
    bestSellingRank: "number",
    salePrice: "number",
    manufacturer: "string",
    type: "string",
    salePrice_range: "string",
    categories: "string[]",
  },
});

const pause = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

type ProgressCB = (percentage: number, total: number) => void;

const batch = 200;
let total = 0;
let loading = 0;
let callback: ProgressCB | undefined;

const load = (limit = -1) => {
  if (loading > 0) return false;
  loading = 1;

  fetch("/ecommerce/bestbuy_seo.json")
    .then((res) => res.json())
    .then(async (data: unknown[] | unknown) => {
      if (!Array.isArray(data)) return;
      let tmp = [];
      if (limit === -1) limit = data.length - 1;
      for (let i = 0; i <= limit; i++) {
        try {
          const item = productSchema.parse(data[i]);
          tmp.push(item);
        } catch (e) {
          // do nothing
        }
        if (tmp.length >= batch || i === limit) {
          // @ts-expect-error Orama ts signature is wrong
          await insertMultiple(ecomerceDB, tmp);
          total += tmp.length;
          tmp = [];
          if (callback) callback(i / limit, total);
          await pause(50);
        }
      }
      loading = 2;
    });

  return true;
};

type EcomerceDB = typeof ecomerceDB;

export type SearchParamsOramaWorker = SearchParams<
  EcomerceDB,
  TypedDocument<EcomerceDB>
> & {
  signalId?: number;
};

export type ResultsOramaWorker = Results<Product> & {
  signalId?: number;
};

const api = {
  load,
  onLoadProgress(cb: ProgressCB) {
    callback = cb;
  },
  search({ signalId, ...rest }: SearchParamsOramaWorker) {
    return search(ecomerceDB, {
      ...rest,
      properties: ["name", "shortDescription", "manufacturer"],
      facets: {
        manufacturer: {},
        type: {},
        salePrice_range: {},
        categories: {},
      },
    }).then((res: ResultsOramaWorker) => {
      res.signalId = signalId;
      return res;
    });
  },
};

export type OramaWorker = typeof api;

expose(api);
