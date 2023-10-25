# faceted-search

Some experiments with faceted search.

## TODO

- build a demo
  - take any open source database
    - https://github.com/algolia/datasets/tree/master/ecommerce
    - https://github.com/searchkit/searchkit/tree/main/sample-data/electronics-ecommerce
  - take any frontend faceted search (only frontend for now)
  - take any UI library and probably Vite
- host on Netlify

## UI components

- [instantsearch](https://github.com/algolia/instantsearch) React, Vue, Angular
  - [typesense-instantsearch-adapter](https://github.com/typesense/typesense-instantsearch-adapter)
  - [searchkit-instantsearch-client](https://github.com/searchkit/searchkit/blob/main/packages/searchkit-instantsearch-client/src/index.ts)
  - [instant-meilisearch](https://github.com/meilisearch/meilisearch-js-plugins/tree/main/packages/instant-meilisearch)
- [searchkit](https://github.com/searchkit/searchkit) Plain JS, React, Vue, Angular
- [reactivesearch](https://github.com/appbaseio/reactivesearch#3-component-playground) React, Vue
- [AddSearch/search-ui](https://github.com/AddSearch/search-ui) Plain JS
- [coveo/search-ui](https://github.com/coveo/search-ui) Plain JS
- [sajari/search-ui](https://github.com/sajari/sdk-react/tree/master/packages/search-ui) React
- [Flowbite: Tailwind CSS Faceted Search Drawers](https://flowbite.com/blocks/application/faceted-search-drawers/)

## Client

### Facets

- [itemsjs](https://github.com/itemsapi/itemsjs)
  - [FastBitSet.js](https://github.com/lemire/FastBitSet.js/) is the secret sauce
    - Same author has other libraries worth to try [roaring-wasm](https://github.com/lemire/roaring-wasm), [TypedFastBitSet](https://github.com/lemire/TypedFastBitSet.js)
- [orama](https://docs.oramasearch.com/usage/search/facets)

### Full-text search

- [orama](https://github.com/oramasearch/orama)
- [pagefind](https://github.com/cloudcannon/pagefind)
- [fuse](https://github.com/krisk/fuse)
- [lunr.js](https://github.com/olivernn/lunr.js)
- [flexsearch](https://github.com/nextapps-de/flexsearch)

### Fuzzy autocomplete

- [uFuzzy](https://github.com/leeoniya/uFuzzy)
- [radix-trie](https://github.com/scttdavs/radix-trie#fuzzyget)
- [symspell](https://yomguithereal.github.io/mnemonist/symspell)
- [fzf-for-js](https://github.com/ajitid/fzf-for-js)

## Server

I'm mainly interested in frontend solution, but I leave it here for the reference

- [meilisearch](https://www.meilisearch.com/docs/learn/fine_tuning_results/faceted_search)
- [typesense](https://typesense.org/docs/0.24.1/api/search.html#facet-results)
- [tantivy](https://github.com/quickwit-oss/tantivy)
  - There is [an attempt to compile it to WASM](https://github.com/phiresky/tantivy-wasm)
  - [bayard](https://github.com/mosuka/bayard)

## Ideas

### Prebuild index for static websites

Typical solution for search for static websites, like Hugo, is to load data as JSON in memory and then index it. Is there a way to build index upfront and fetch it from the server with [HTTP range request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)? It can be optimized for reads format, like [Parquet](https://github.com/kylebarron/parquet-wasm).

[stork](https://github.com/jameslittle230/stork) (deprecated) has CLI for building index and JS library to consume it.

### Benchmark

- https://nextapps-de.github.io/flexsearch/bench/
- https://github.com/leeoniya/uFuzzy#a-biased-appraisal-of-similar-work
- https://github.com/tinysearch/tinysearch/issues/136
- https://github.com/oramasearch/orama/issues/76

### Web Workers

Use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) for client side indexing.

### Collection schema

There is a trend, which I would call "collection schema", for example:

- [Astro](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema)
- [contentlayer](https://contentlayer.dev/)

This schema can be re-used for facets.

**Related**:

- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) - as soon as you define schema you can view database

### Markdown files as database

- [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [markdown-to-sqlite](https://github.com/simonw/markdown-to-sqlite)
- [Using sqlite3 as a notekeeping document graph with automatic reference indexing](https://epilys.github.io/bibliothecula/notekeeping.html)
- [docsql](https://github.com/peterbe/docsql)

### Astro integration

- [orama](https://docs.oramasearch.com/plugins/plugin-astro)
- [pagefind](https://github.com/shishkin/astro-pagefind)
- [fuse](https://github.com/johnny-mh/blog2/tree/main/packages/astro-fuse)
- [lunr](https://github.com/jackcarey/astro-lunr)
- [minisearch](https://github.com/Barnabas/astro-minisearch/)
