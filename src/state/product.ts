import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Product } from "@/types";
import { requestWithFallback } from "@/utils/request";

// Product list state - load 10 newest products for home page
export const featureProductsState = atom(async () => {
  try {
    const response = await requestWithFallback<{
      success: boolean;
      data: {
        products: Product[];
        pagination: {
          current_page: number;
          total_pages: number;
          total_items: number;
          items_per_page: number;
          has_next: boolean;
          has_previous: boolean;
        };
      };
    }>("/products.php?limit=10&page=1", {
      success: false,
      data: { 
        products: [], 
        pagination: {
          current_page: 1,
          total_pages: 0,
          total_items: 0,
          items_per_page: 10,
          has_next: false,
          has_previous: false
        }
      }
    });

    if (response.success && response.data.products) {
      return response.data.products.map(product => ({
        ...product,
        description: product.short_description,
      }));
    }
    return [];
  } catch (error) {
    console.warn("Error fetching products:", error);
    return [];
  }
});

// All products state with pagination support
export const productsState = atom(async () => {
  try {
    const response = await requestWithFallback<{
      success: boolean;
      data: {
        products: Product[];
        pagination: any;
      };
    }>("/products.php", {
      success: false,
      data: { products: [], pagination: {} }
    });

    if (response.success && response.data.products) {
      return response.data.products.map(product => ({
        ...product,
        // Map fields for component compatibility
        image: product.thumbnail || product.product_image,
        description: product.short_description,
        category: { id: product.categories?.[0]?.id, name: product.categories?.[0]?.name, image: "" }, // Default category for product list
      }));
    }
    return [];
  } catch (error) {
    console.warn("Error fetching all products:", error);
    return [];
  }
});

// Recommended products state (same as feature products for now)
export const recommendedProductsState = featureProductsState;

// Individual product state by ID
export const productState = atomFamily((id: number) =>
  atom(async (): Promise<Product> => {
    try {
      const response = await requestWithFallback<{
        success: boolean;
        data: Product;
      }>(`/product-detail.php?id=${id}`, {
        success: false,
        data: {
          id: 0,
          name: "",
          price: 0,
          category: { id: 0, name: "", image: "" }
        } as Product
      });

      if (response.success && response.data && response.data.id > 0) {
        return {
          ...response.data,
          // Map fields for component compatibility
          image: response.data.images?.thumbnail || response.data.thumbnail,
          description: response.data.full_description || response.data.short_description,
          category: response.data.categories?.[0] ? {
            id: response.data.categories[0].id,
            name: response.data.categories[0].name,
            image: ""
          } : { id: 0, name: "", image: "" }
        };
      }
      return {
        id: 0,
        name: "",
        price: 0,
        category: { id: 0, name: "", image: "" }
      } as Product;
    } catch (error) {
      console.warn(`Error fetching product ${id}:`, error);
      return {
        id: 0,
        name: "",
        price: 0,
        category: { id: 0, name: "", image: "" }
      } as Product;
    }
  })
);
