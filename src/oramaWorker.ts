import { expose } from "comlink";
import { productSchema } from "./data/schema";
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
    thumbnailImage: "string",
    salePrice: "number",
    url: "string",
    image: "string",
    objectID: "string",
    shipping: "string",
    customerReviewCount: "number",
    // manufacturer: "enum",
    // type: "enum",
    // salePrice_range: "enum",
    // categories: "enum[]",
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

const load = () => {
  if (loading > 0) return false;
  loading = 1;

  fetch("/ecommerce/bestbuy_seo.json")
    .then((res) => res.json())
    .then(async (data: unknown[] | unknown) => {
      if (!Array.isArray(data)) return;
      let tmp = [];
      for (let i = 0; i < data.length; i++) {
        try {
          const item = productSchema.parse(data[i]);
          tmp.push(item);
        } catch (e) {
          // do nothing
        }
        if (tmp.length >= batch || i === data.length - 1) {
          // @ts-expect-error Orama ts signature is wrong
          await insertMultiple(ecomerceDB, tmp);
          total += tmp.length;
          tmp = [];
          if (callback) callback(i / (data.length - 1), total);
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

export type ResultsOramaWorker = Results<{
  name: string;
  shortDescription: string;
  bestSellingRank: string;
  thumbnailImage: string;
  salePrice: string;
  url: string;
  image: string;
  objectID: string;
  shipping: string;
  customerReviewCount: string;
  manufacturer: string;
  type: string;
  salePrice_range: string;
  categories: string;
}> & {
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
