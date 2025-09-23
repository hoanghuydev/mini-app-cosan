import { atom } from "jotai";
import { requestWithFallback } from "@/utils/request";

// Banner state
export const bannersState = atom(async () =>
{ 
    try {
        const response = await requestWithFallback<{
            success: boolean;
            data: {
                banners: string[];
            };
        }>("/banners.php", {
            success: false,
            data: { banners: [] }
        });
        return response.data.banners;
      } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
      }
}
 
);

// Tab states
export const selectedTabIndexState = atom(0);
