# Faceted search experiments

- Read more about experiment [here](https://stereobooster.com/posts/faceted-search/)
- Checkout online demo [here](https://faceted.stereobooster.com/)

## Development

```
pnpm i
pnpm run dev
```

## Experiments

### Tanstack

- [source code](src/pages/tanstack/)
- [demo](https://faceted.stereobooster.com/pages/tanstack/)

### Orama

- [source code](src/pages/orama/)
- [demo](https://faceted.stereobooster.com/pages/orama/)

### ItemsJS

- [source code](src/pages/itemsjs/)
- [demo](https://faceted.stereobooster.com/pages/itemsjs/)

**Note**: production build for ItemsJS is broken, but it work in development mode. Most likely it is brokwn here:

```ts
chain(items)
    .map((item) => {
      fields.forEach((field) => {
```

This demo is very similar to Facets demo. So use it meantime

### Facets

- [source code](src/pages/facets/)
- [demo](https://faceted.stereobooster.com/pages/facets/)
