import { create, insert } from "@orama/orama";

// TODO: webworker
// TODO: loading indicator

export const ecomerceDB = await create({
  schema: {
    name: "string",
    shortDescription: "string",
    bestSellingRank: "number",
    thumbnailImage: "string",
    salePrice: "number",
    url: "string",
    image: "string",
    objectID: "string",
    shipping: "string",
    customerReviewCount: "number",
    // manufacturer: "enum",
    // type: "enum",
    // salePrice_range: "enum",
    // categories: "enum[]",
    manufacturer: "string",
    type: "string",
    salePrice_range: "string",
    categories: "string[]",
  },
});

// @ts-expect-error xxx
window.ecomerceDB = ecomerceDB;

fetch("/ecommerce/bestbuy_seo.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item: unknown) => {
      // @ts-expect-error xxx
      insert(ecomerceDB, item).catch(() => {});
    });

    console.log("done");
  });
