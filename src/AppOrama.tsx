import { Fragment, useState } from "react";
import { useSearch } from "./components/useSearch";

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
