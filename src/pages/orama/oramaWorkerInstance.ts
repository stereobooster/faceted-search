import { wrap } from "comlink";
import { OramaWorker } from "./oramaWorker";

const worker = new Worker(new URL("./oramaWorker.ts", import.meta.url), {
  type: "module",
});

export const oramaWorker = wrap<OramaWorker>(worker);
