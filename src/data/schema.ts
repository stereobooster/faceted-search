import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const productSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  bestSellingRank: z.number(),
  thumbnailImage: z.string(),
  salePrice: z.number(),
  url: z.string(),
  image: z.string(),
  objectID: z.string(),
  shipping: z.string(),
  customerReviewCount: z.number(),
  manufacturer: z.string(),
  type: z.string(),
  salePrice_range: z.string(),
  categories: z.array(z.string()),
});

export type Product = z.infer<typeof productSchema>;
