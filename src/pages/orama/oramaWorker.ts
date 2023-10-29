import { expose } from "comlink";
import {
  Product,
  defaultLimit,
  loadData,
  oramaFacets,
  oramaSchema,
  searchFields,
} from "@/data/schema";
import {
  SearchParams,
  TypedDocument,
  Results,
  create,
  insertMultiple,
  search,
  Orama,
} from "@orama/orama";

// Module format "iife" does not support top-level await. Use the "es" or "system" output formats rather.
let ecomerceDB: Orama<typeof oramaSchema>;
const ecomerceDBPromise = create({ schema: oramaSchema }).then((x) => {
  ecomerceDB = x;
});

// const pause = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

type ProgressCB = (percentage: number, total: number) => void;

const batch = 200;
let total = 0;
let loading = 0;
let callback: ProgressCB | undefined;

const load = (limit = defaultLimit) => {
  if (loading > 0) return false;
  loading = 1;

  ecomerceDBPromise.then(() => {
    loadData(limit).then(async (data) => {
      let tmp = [];
      for (let i = 0; i < limit; i++) {
        tmp.push(data[i]);
        if (tmp.length >= batch || i === limit - 1) {
          // @ts-expect-error Orama TS signature is wrong
          await insertMultiple(ecomerceDB, tmp);
          total += tmp.length;
          tmp = [];
          if (callback) callback(i / (limit - 1), total);
          // await pause(50);
        }
      }
      loading = 2;
    });
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
    return ecomerceDBPromise.then(() => {
      return search(ecomerceDB, {
        ...rest,
        properties: searchFields,
        facets: oramaFacets,
      }).then((res: ResultsOramaWorker) => {
        res.signalId = signalId;
        return res;
      });
    });
  },
};

export type OramaWorker = typeof api;

expose(api);
