import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Product } from "@/types";
import { requestWithFallback } from "@/utils/request";

// API response type for Zalo Mini App products




// Product list state - load 10 newest products for home page
export const featureProductsState = atom(async () => {
  try {
    const response = await requestWithFallback<{
      returnCode: number;
      data: Product[];
    }>(
      "/products?limit=10&page=1", 
      {
        returnCode: 0,
        data: []
      }
    );

    if (response.returnCode == 1 && response.data) {
      return response.data.map(product => ({
        ...product,
        image: product.thumbnail_url,
        thumbnail: product.thumbnail_url,
        description: product.product_line || "",
        short_description: product.product_line || "",
        category: { id: 0, name: product.product_line || "", image: "" }
      } as Product));
    }
    return [];
  } catch (error) {
    console.warn("Error fetching feature products:", error);
    return [];
  }
});

// All products state - get all products without pagination
export const productsState = atom(async () => {
  try {
    const response = await requestWithFallback<{
      returnCode: number;
      data: Product[];
    }>(
      "/products", 
      {
        returnCode: 0,
        data: []
      }
    );

    if (response.returnCode == 1 && response.data) {
      return response.data.map(product => ({
        ...product,
        image: product.thumbnail_url,
        thumbnail: product.thumbnail_url,
        description: product.product_line || "",
        short_description: product.product_line || "",
        category: { id: 0, name: product.product_line || "", image: "" }
      } as Product));
    }
    return [];
  } catch (error) {
    console.warn("Error fetching all products:", error);
    return [];
  }
});

// Recommended products state (same as feature products for now)
export const recommendedProductsState = featureProductsState;

// Individual product detail response type


// Individual product state by ID - use dedicated API endpoint
export const productState = atomFamily((id: number) =>
  atom(async (): Promise<Product> => {
    try {
      const response = await requestWithFallback<{
        returnCode: number;
        data: Product;
      }>(`/products/${id}`, {
        returnCode: 0,
        data: {
          id: 0,
          name: "",
          product_line: "",
          sku: "",
          price: 0,
          thumbnail_url: "",
          images: []
        }
      });

      if (response.returnCode == 1 && response.data && response.data.id > 0) {
        const product = response.data;
        return product;
      }
      return {
        id: 0,
        name: "",
        product_line: "",
        sku: "",
        price: 0,
        thumbnail_url: "",
        images: [],
        category: { id: 0, name: "", image: "" }
      } as Product;
    } catch (error) {
      console.warn(`Error fetching product ${id}:`, error);
      return {
        id: 0,
        name: "",
        product_line: "",
        sku: "",
        price: 0,
        thumbnail_url: "",
        images: [],
        category: { id: 0, name: "", image: "" }
      } as Product;
    }
  })
);
