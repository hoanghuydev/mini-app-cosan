import ProductGrid from "@/components/product-grid";
import Section from "@/components/section";
import { useAtomValue } from "jotai";
import { featureProductsState } from "@/state";

export default function ProductList() {
  const products = useAtomValue(featureProductsState);

  return (
    <Section title="Sản phẩm mới nhất" viewMoreTo="/products">
      <ProductGrid products={products} />
    </Section>
  );
}
