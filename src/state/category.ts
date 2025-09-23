import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { requestWithFallback } from "@/utils/request";

export const categoriesState = atom(async () => {
  try {
    const response = await requestWithFallback<{
      success: boolean;
      data: {
        categories: Array<{
          id: number;
          name: string;
          code: string;
          parent_id: number | null;
          product_count?: number;
          children?: Array<any>;
        }>;
        structure: string;
      };
    }>("/categories.php?type=product&include_children=false", {
      success: false,
      data: { categories: [], structure: "flat" }
    });

    if (response.success && response.data.categories) {
      return response.data.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        image: "", // Không cần hình ảnh theo yêu cầu
      }));
    }
    return [];
  } catch (error) {
    console.warn("Error fetching categories:", error);
    return [];
  }
});

export const categoriesStateUpwrapped = unwrap(
  categoriesState,
  (prev) => prev ?? []
);
