import { useEffect, useRef, useState } from "react";
import { oramaWorker } from "../oramaWorkerInstance";
import { proxy } from "comlink";
import { ResultsOramaWorker, SearchParamsOramaWorker } from "../oramaWorker";

export const useSearch = ({
  term,
  where,
  sortBy,
  limit,
  offset,
}: SearchParamsOramaWorker) => {
  const [results, setResults] = useState<ResultsOramaWorker | null>(null);
  const counter = useRef(0);

  useEffect(() => {
    oramaWorker.load(1000).then((res) => {
      if (res) return;

      oramaWorker.onLoadProgress(
        proxy((percentage, total) => {
          console.log(percentage, total);
          if (counter.current > 1) return;

          counter.current += 1;
          oramaWorker
            .search({ term, where, signalId: counter.current })
            .then(({ signalId, ...rest }) => {
              if (signalId === counter.current) setResults(rest);
            });
        })
      );
    });
  }, []);

  useEffect(() => {
    counter.current += 1;
    oramaWorker
      .search({ term, where, sortBy, limit, offset, signalId: counter.current })
      .then(({ signalId, ...rest }) => {
        if (signalId === counter.current) setResults(rest);
      });
  }, [term, where, sortBy, limit, offset]);

  useEffect(() => {
    // @ts-expect-error Comlink can't handle optional params
    oramaWorker.onLoadProgress();
    counter.current = -1;
  }, []);

  return results;
};
