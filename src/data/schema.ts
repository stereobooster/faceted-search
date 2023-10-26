import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  bestSellingRank: z.number(),
  salePrice: z.number(),
  manufacturer: z.string(),
  type: z.string(),
  salePrice_range: z.string(),
  categories: z.array(z.string()),
  // thumbnailImage: z.string(),
  // url: z.string(),
  // image: z.string(),
  // objectID: z.string(),
  // shipping: z.string(),
  // customerReviewCount: z.number(),
});

export type Product = z.infer<typeof productSchema>;
