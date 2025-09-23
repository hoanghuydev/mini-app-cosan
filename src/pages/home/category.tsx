import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useAtomValue } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { categoriesState } from "@/state";

export default function Category() {
  const categories = useAtomValue(categoriesState);

  return (
    <Section title="Danh mục sản phẩm" viewMoreTo="/categories">
      <div className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4">
        {categories.map((category) => (
          <TransitionLink
            key={category.id}
            className="flex-none px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
            to={`/category/${category.id}`}
          >
            <div className="text-center text-sm font-medium text-gray-800">
              {category.name}
            </div>
          </TransitionLink>
        ))}
      </div>
    </Section>
  );
}
