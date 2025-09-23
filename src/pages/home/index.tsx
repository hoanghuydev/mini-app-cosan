import { useNavigate } from "react-router-dom";
import Banners from "./banners";
import SearchBar from "../../components/search-bar";
import Category from "./category";
import ProductList from "./product-list";
import HorizontalDivider from "@/components/horizontal-divider";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full bg-section">
      <div className="bg-background pt-2">
        <SearchBar onClick={() => navigate("/search")} />
        <Banners />
      </div>
      <div className="bg-background space-y-2 mt-2">
        <Category />
      </div>
      <HorizontalDivider />
      <ProductList />
    </div>
  );
};

export default HomePage;
