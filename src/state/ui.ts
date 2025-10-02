import { atom } from "jotai";
import { requestWithFallback } from "@/utils/request";

// Banner state
export const bannersState = atom(async () =>
{ 
    try {
        const response = await requestWithFallback<{
            returnCode: number;
            data: {
                banners: string[];
            };
        }>("/banners", {
            returnCode: 0,
            data: { banners: [] }
        });
        return response.returnCode == 1 ? response.data.banners : [];
      } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
      }
}
 
);

// Tab states
export const selectedTabIndexState = atom(0);
