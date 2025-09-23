import Carousel from "@/components/carousel";
import { useAtomValue } from "jotai";
import { bannersState } from "@/state";

export default function Banners() {
  const banners = useAtomValue(bannersState);

  const bannerAlts = [
    "Banner Serum Hana Heal - Sản phẩm nổi bật của OSACI",
    "Banner bộ 4 sản phẩm OSACI"
  ];

  return (
    <Carousel
      slides={banners.map((banner, index) => (
        <img 
          key={index}
          className="w-full rounded" 
          src={banner} 
          alt={bannerAlts[index] || "Banner OSACI"} 
        />
      ))}
    />
  );
}
