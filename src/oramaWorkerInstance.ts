import { wrap } from "comlink";

const worker = new Worker(new URL("./oramaWorker.ts", import.meta.url), {
  name: "OramaWorker",
  type: "module",
});

export const oramaWorker = wrap<import("./oramaWorker").OramaWorker>(worker);
