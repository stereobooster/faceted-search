# faceted-search

Some experiments with faceted search.

## UI components

- [instantsearch](https://github.com/algolia/instantsearch) React, Vue, Angular
- [searchkit](https://github.com/searchkit/searchkit) Plain JS, React, Vue, Angular
- [reactivesearch](https://github.com/appbaseio/reactivesearch#3-component-playground) React, Vue
- [AddSearch/search-ui](https://github.com/AddSearch/search-ui) Plain JS
- [coveo/search-ui](https://github.com/coveo/search-ui) Plain JS
- [sajari/search-ui](https://github.com/sajari/sdk-react/tree/master/packages/search-ui) React
- [Flowbite: Tailwind CSS Faceted Search Drawers](https://flowbite.com/blocks/application/faceted-search-drawers/)

## Server

Most of them are implemented with Rust

- [meilisearch](https://www.meilisearch.com/docs/learn/fine_tuning_results/faceted_search)
- [typesense](https://typesense.org/docs/0.24.1/api/search.html#facet-results)
- [tantivy](https://github.com/quickwit-oss/tantivy)
  - There is [an attempt to compile it to WASM](https://github.com/phiresky/tantivy-wasm)

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

- [radix-trie](https://github.com/scttdavs/radix-trie#fuzzyget)
- [symspell](https://yomguithereal.github.io/mnemonist/symspell)
- [fzf-for-js](https://github.com/ajitid/fzf-for-js)

## Ideas

### Prebuild index for static websites

Typical solution for search for static websites, like Hugo, is to load data as JSON in memory and then index it. Is there a way to build index upfront and fetch it from server with [HTTP range request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)? It can be optimized for reads format, like [Parquet](https://github.com/kylebarron/parquet-wasm).

### Benchmark

https://nextapps-de.github.io/flexsearch/bench/

### Web Workers

Use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) for client side indexing.
