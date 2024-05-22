import { z } from "zod";
import { Schema } from "@stereobooster/facets";

export const productSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  salePrice: z.number(),
  bestSellingRank: z.number(),
  manufacturer: z.string(),
  type: z.string(),
  categories: z.array(z.string()),
  // salePrice_range: z.string(),
  // thumbnailImage: z.string(),
  // url: z.string(),
  // image: z.string(),
  // objectID: z.string(),
  // shipping: z.string(),
  // customerReviewCount: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export const defaultVisibilityFilter = {
  name: true,
  shortDescription: true,
  salePrice: true,
  bestSellingRank: false,
  manufacturer: false,
  type: false,
  categories: false,
};

export const oramaSchema = {
  name: "string",
  shortDescription: "string",
  salePrice: "number",
  bestSellingRank: "number",
  manufacturer: "string",
  type: "string",
  categories: "string[]",
};

export const searchFields = [
  "name",
  "shortDescription",
  "manufacturer",
] as Array<keyof Product>;

export const itemsJsFacets = {
  manufacturer: {
    title: "Manufacturer",
    size: 10,
    conjunction: false,
  },
  type: {
    title: "Type",
    size: 10,
    conjunction: false,
  },
  categories: {
    title: "Categories",
    size: 10,
    conjunction: false,
  },
  salePrice: {
    title: "Price",
    show_facet_stats: true,
  },
};

export const facetsSchema = {
  name: {
    type: "string",
    text: true,
  },
  shortDescription: {
    type: "string",
    text: true,
  },
  salePrice: {
    type: "number",
    facet: true,
  },
  bestSellingRank: {
    type: "number",
    facet: true,
  },
  manufacturer: {
    type: "string",
    facet: true,
  },
  type: {
    type: "string",
    facet: true,
  },
  categories: {
    type: "string",
    facet: true,
  },
} satisfies Schema;

export const oramaFacets = {
  manufacturer: {},
  type: {},
  categories: {},
};

export const defaultLimit = 1000;

export const loadData = (limit = -1) =>
  fetch("/ecommerce/bestbuy_seo.json")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) return [];
      const result = [];
      for (const i in data) {
        try {
          const {
            name,
            shortDescription,
            salePrice,
            bestSellingRank,
            manufacturer,
            type,
            categories,
          } = productSchema.parse(data[i]);

          result.push({
            name,
            shortDescription,
            salePrice,
            bestSellingRank,
            manufacturer,
            type,
            categories,
          });
        } catch (e) {
          // do nothing
        }
        if (result.length === limit) break;
      }

      return result;
    });
