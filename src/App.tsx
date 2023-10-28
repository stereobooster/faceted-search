import { Fragment, useEffect, useRef, useState } from "react";
import { oramaWorker } from "./oramaWorkerInstance";
import { proxy } from "comlink";
import { ResultsOramaWorker } from "./oramaWorker";

const useSearch = ({
  term,
  where,
}: {
  term: string;
  where: Record<string, string[]>;
}) => {
  const [results, setResults] = useState<ResultsOramaWorker | null>(null);
  const counter = useRef(0);

  useEffect(() => {
    oramaWorker.load().then((res) => {
      if (res) return;

      oramaWorker.onLoadProgress(
        proxy((x) => {
          console.log(x);
          counter.current += 1;
          oramaWorker
            .search({ term, where, signalId: counter.current })
            .then(({ signalId, ...rest }) => {
              if (signalId === counter.current) setResults(rest);
            });
        })
      );
    });
  }, [term, where]);

  useEffect(() => {
    counter.current += 1;
    oramaWorker
      .search({ term, where, signalId: counter.current })
      .then(({ signalId, ...rest }) => {
        if (signalId === counter.current) setResults(rest);
      });
  }, [term, where]);

  useEffect(() => {
    // @ts-expect-error Comlink can't handle optional params
    oramaWorker.onLoadProgress();
    counter.current = -1;
  }, []);

  return results;
};

function App() {
  const [term, setTerm] = useState("");
  const [where, setWhere] = useState<Record<string, string[]>>({});
  const results = useSearch({ term, where });

  return (
    <>
      <input value={term} onChange={(e) => setTerm(e.target.value)} />
      <p>Results: {results?.count}</p>
      {results && (
        <>
          {results.hits.map((hit) => (
            <details key={hit.id}>
              <summary>{hit.document.name}</summary>
              {JSON.stringify(hit.document)}
            </details>
          ))}
          {Object.keys(results.facets!).map((facetName) => {
            const facet = results.facets![facetName].values;
            return (
              <details key={facetName}>
                <summary>{facetName}</summary>
                {Object.entries(facet).map(([k, v]) => (
                  <Fragment key={k}>
                    <label>
                      <input
                        type="checkbox"
                        onClick={() => {
                          setWhere((x) => ({ ...x, [facetName]: [k] }));
                        }}
                      />{" "}
                      {k} ({v})
                    </label>
                    <br />
                  </Fragment>
                ))}
              </details>
            );
          })}
        </>
      )}
    </>
  );
}

export default App;
