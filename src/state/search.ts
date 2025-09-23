import { atom } from "jotai";
import { productsState } from "./product";

// Search keyword state
export const keywordState = atom("");

// Search results state
export const searchResultState = atom(async (get) => {
  const keyword = get(keywordState);
  const products = await get(productsState);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
});
