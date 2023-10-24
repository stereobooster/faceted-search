# faceted-search

Some experiments with faceted search.

## UI components

Most of them are implemented with React

- [instantsearch](https://github.com/algolia/instantsearch)
- [searchkit](https://github.com/searchkit/searchkit)
- [reactivesearch](https://github.com/appbaseio/reactivesearch#3-component-playground)
- [AddSearch/search-ui](https://github.com/AddSearch/search-ui)
- [coveo/search-ui](https://github.com/coveo/search-ui)
- [sajari/search-ui](https://github.com/sajari/sdk-react/tree/master/packages/search-ui)
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

### Full-text search

- [orama](https://github.com/oramasearch/orama)
- [pagefind](https://github.com/cloudcannon/pagefind)
- [fuse](https://github.com/krisk/fuse)
- [lunr.js](https://github.com/olivernn/lunr.js)
